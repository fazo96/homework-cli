#!/usr/bin/env node
var request = require('request')
var chalk = require('chalk')
var cli = require('commander')
var moment = require('moment')

cli
  .version('1.3.0')
  .usage('command [arguments]')
  .option('-k, --key [apikey]','use given api key')
  .option('-u, --url [endpoint]','use given api endpoint')
  .option('-v, --verbose', 'be more verbose')
  .option('-i, --id', 'show item IDs')
  .parse(process.argv)

if(!cli.key){
  console.log(chalk.red("Invalid API key"));
  process.exit(1)
}

var url = (cli.url || 'http://homework.meteor.com/api') + '/' + cli.key 
if(cli.verbose) console.log(chalk.bold('URL: ') + url)

function notes(archived,callback){
  request(url, function(error,response,body){
    if(error)
      console.log(chalk.red("Error: ") + chalk.bold(error))
    else
      if(cli.verbose) console.log(chalk.bold("Response: ") + body)
      var obj = JSON.parse(body)
      var ret = ""
      if(obj.forEach){
        obj.forEach(function(x){
          var date = x.date
          if(date != false) date = moment.unix(x.date).format('DD/MM/YYYY')
          var str = '\n' + chalk.green('- ') + chalk.bold(x.title)
          if(date != false) str += ' (' + chalk.yellow("Due: ") + chalk.underline(date) + ')'
          if(cli.id) str += ' (' + chalk.bold('ID: ') + chalk.underline(x._id) + ')'
          if(x.content) str += '\n\t' + chalk.green(x.content)
          ret += str.substring(1) + '\n'
        })
      } else callback(body)
      callback(ret)
  })
}

notes(false,function(x){console.log(x)})
