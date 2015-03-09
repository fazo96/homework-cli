#!/usr/bin/env node
var request = require('request')
var chalk = require('chalk')
var cli = require('commander')
var moment = require('moment')

cli
  .version('1.3.0')
  .description('interact with a running instance of Homework (by default homework.meteor.com)')
  .usage('[command] [arguments]')
  .option('-k, --key <apikey>','use given api key')
  .option('-u, --url <endpoint>','use given api endpoint instead of http://homework.meteor.com/api')
  .option('-v, --verbose', 'be more verbose')
  .option('-i, --id', 'show item IDs')
  .option('-d, --delete <noteid> [otherids...]', 'delete note(s) with given id')
  .option('-s, --silent',"don't print note list")
  .option('-a, --archived','view archived notes')

cli
  .command('new <title> [content]')
  .description('create a new note')
  .option('--date <date>', 'the due date for the program')
  .action(postNote)

cli.parse(process.argv)
var baseurl = (cli.url || 'http://homework.meteor.com/api') + '/' + cli.key

if(!cli.key){
  console.log(chalk.red("Invalid API key"));
  cli.help()
}

function postNote(title,content,options){
  request.post({uri: (cli.url || 'http://homework.meteor.com/api') + '/' + cli.key, json: {
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

function notes(archived,callback){
  if(cli.verbose) console.log(chalk.bold('URL: ') + baseurl)
  request({ uri: baseurl + (archived?'/archived':''), json: true }, function(error,response,body){
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
          if(cli.id) str += ' (' + chalk.bold('ID: ') + chalk.underline(x._id) + ')'
          if(archived) str += ' (' + chalk.green('archived') + ')'
          if(x.content) str += '\n\t' + chalk.green(x.content)
          ret += str.substring(1) + '\n'
        })
      } else callback(body)
      callback(ret.substring(0,ret.length-1))
  })
}

function delNotes(list){
  var deleted = 0
  list.forEach(function(x){
    request.del({ uri: baseurl+'/'+x, json: true },function(error,response,body){
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

if(cli.delete) delNotes(cli.delete.split(' '))
if(!cli.silent) notes(cli.archived || false, console.log)
