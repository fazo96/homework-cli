# Homework CLI

Command line interface for [Homework](github.com/fazo96/homework).

## Setup

1. Install using `npm install -g homework-cli`
2. Run with the `homework` command

- By default, _homework-cli_ connects to [homework.meteor.com](http://homework.meteor.com), but you can customize the url.
- An account with an _API key_ is required to access the __RESTful API__ used by this tool. The __API__ must also be enabled on the Homework server.

__Please Note__: as of the time of writing, [Homework](http://github.com/fazo96/homework) only has experimental __RESTful API__ support, so this tool can't yet be used easily with [homework.meteor.com](http://homework.meteor.com).

## Usage

    Usage: homework [command] [arguments]

    interact with a running instance of Homework (by default homework.meteor.com)

    Commands:

      new|add [options] <title> [content]  create a new note
      delete <ids...>                  delete one or more notes
      show [options]                   show all notes
      save-cfg [options]               save arguments (apiKey and URL) to configuration file at ~/.config/homework-cli.json

    Options:

      -h, --help            output usage information
      -V, --version         output the version number
      -k, --key <apikey>    use given api key
      -u, --url <endpoint>  use given api endpoint instead of http://homework.meteor.com/api
      -v, --verbose         be more verbose
      -s, --silent          don't print note list

A command may have its own options. To see them, run `homework --help <command>`

### Configuration file

The tool can read the `key` and `url` command line parameters from a configuration file for the comfort of the user.
The first time you run the program with your own settings, use the `save-cfg` command to save the configuration to `~/.config/homework-cli.json`.
You can update the configuration with `save-cfg` of course, or temporary use different settings with the command line arguments.

__Example:__ `homework --key my_api_key --url my_custom_url save-cfg` will save the given configuration to the settings file.

## License

The MIT License (MIT)

Copyright (c) 2015 Enrico Fasoli (fazo96)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
