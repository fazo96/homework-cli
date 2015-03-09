#!/usr/bin/env node
var request = require('request')
var chalk = require('chalk')
var cli = require('commander')
var moment = require('moment')
var fs = require('fs')

var cfgpath = process.env.HOME+'/.config/homework-cli.json'

cli
  .version('1.3.0')
  .description('interact with a running instance of Homework (by default homework.meteor.com)')
  .usage('[command] [arguments]')
  .option('-k, --key <apikey>','use given api key')
  .option('-u, --url <endpoint>','use given api endpoint instead of http://homework.meteor.com/api')
  .option('-v, --verbose', 'be more verbose')
  .option('-s, --silent',"don't print note list")

cli
  .command('new <title> [content]')
  .alias('add')
  .description('create a new note')
  .option('--date <date>', 'the due date for the program')
  .action(postNote)

cli
  .command('delete <ids...>')
  .description('delete one or more notes')
  .action(delNotes)

cli
  .command('show')
  .description('show all notes')
  .option('-a, --archived','view archived notes')
  .option('-i, --id','show IDs')
  .action(function(options){ getNotes(options.archived || false, options.showids, console.log) })

cli
  .command('save-cfg')
  .description('save arguments (apiKey and URL) to configuration file at '+cfgpath)
  .option('--stdout','print to stdout instead')
  .action(function(options){
    preRan = true
    var cfg = JSON.stringify({apiKey: cli.key, url: cli.url})
    if(options.stdout) console.log(cfg)
    else fs.writeFile(cfgpath,cfg,function(err){
      if(err) console.log(chalk.red('Error: ') + chalk.bold(err))
      else console.log(chalk.green('Configuration saved to '+chalk.bold(cfgpath)))
    })
  })

function baseurl(){ return (cli.url || 'http://homework.meteor.com/api') + '/' + cli.key }

var preRan = false
function preRun(){
  if(!cli.key){
    console.log(chalk.red("Invalid API key"));
    return false;
  } else preRan = true
  return true;
}

function postNote(title,content,options){
  if(!preRun()) return;
  request.post({uri: baseurl(), json: {
    title: title,
    content: content,
    date: options.date || false
  }},function(error,response,body){
    if(error)
      console.log(chalk.red("Error: ") + chalk.bold(error))
    else
      if(cli.verbose) console.log(chalk.bold("Response: ") + JSON.stringify(body))
      if(body.error) console.log(chalk.red("Error: ") + chalk.bold(body.error))
      else console.log(chalk.green("Inserted note: " + chalk.bold(body.inserted)))
  })
}

function getNotes(archived,showids,callback){
  if(!preRun()) return;
  if(cli.verbose) console.log(chalk.bold('URL: ') + baseurl())
  request({ uri: baseurl() + (archived?'/archived':''), json: true }, function(error,response,body){
    if(error)
      console.log(chalk.red("Error: ") + chalk.bold(error))
    else
      if(cli.verbose) console.log(chalk.bold("Response: ") + JSON.stringify(body))
      var ret = ""
      if(body.forEach){
        body.forEach(function(x){
          var date = x.date
          if(date != false) date = moment.unix(x.date).format('DD/MM/YYYY')
          var str = '\n' + chalk.green('- ') + chalk.bold(x.title)
          if(date != false) str += ' (' + chalk.yellow("Due: ") + chalk.underline(date) + ')'
          if(showids) str += ' (' + chalk.bold('ID: ') + chalk.underline(x._id) + ')'
          if(archived) str += ' (' + chalk.green('archived') + ')'
          if(x.content) str += '\n\t' + chalk.green(x.content)
          ret += str.substring(1) + '\n'
        })
      } else if(body.error) console.log(chalk.red("Error: ") + chalk.bold(body.error))
      else callback(body)
      callback(ret.substring(0,ret.length-1))
  })
}

function delNotes(list){
  if(!preRun()) return;
  var deleted = 0
  list.forEach(function(x){
    request.del({ uri: baseurl()+'/'+x, json: true },function(error,response,body){
      if(error)
        console.log(chalk.red("Error: ") + chalk.bold(error))
      else
        if(cli.verbose) console.log(chalk.bold("Response: ") + JSON.stringify(body))
        if(body.error) console.log(chalk.red("Error:") + obj.error)
        else deleted += body.deleted
    })
  })
  console.log(chalk.green('Delete: ') + chalk.bold(deleted) + ' notes deleted from the database')
  if(!cli.silent) console.log()
}

// Run

fs.readFile(cfgpath,function(error,content){
  var cfg = {}
  if(error){
    if(cli.verbose) console.log(chalk.red("Error: ")+chalk.bold(error))
  } else try {
    cfg = JSON.parse(content)
    if(cfg.apiKey) cli.key = cfg.apiKey
    if(cfg.url) cli.url = cfg.url
  } catch(e){
    console.log(chalk.yellow("Warning: ")+ "found configuration file at " + chalk.bold(cfgpath) + " but it is not a valid json:\n\t"+chalk.bold(e))
  }
  cli.parse(process.argv)
  if(!preRan) console.log(chalk.green("Tip: ")+"see "+chalk.bold(cli.name()+" --help"))
})
