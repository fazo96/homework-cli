# Homework CLI

Command line interface for [Homework](github.com/fazo96/homework).

## Setup

1. Install using `npm install -g homework`
2. Run with the `homework` command

- By default, _homework-cli_ connects to homework.meteor.com, but you can customize the url.
- An account with an _API key_ is required to access the __RESTful API__ used by this tool. The __API__ must also be enabled on the Homework server.

__Please Note__: as of the time of writing, [Homework](github.com/fazo96/homework) only has experimental __RESTful API__ support, so this tool can't yet be used easily with homework.meteor.com.

## Usage

    Usage: homework [command] [arguments]

    interact with a running instance of Homework (by default homework.meteor.com)

    Commands:

      new [options] <title> [content]  create a new note
      delete <ids...>                  delete one or more notes

    Options:

      -h, --help            output usage information
      -V, --version         output the version number
      -k, --key <apikey>    use given api key
      -u, --url <endpoint>  use given api endpoint instead of http://homework.meteor.com/api
      -v, --verbose         be more verbose
      -i, --id              show item IDs
      -s, --silent          don't print note list
      -a, --archived        view archived notes

If running with no _commands_, the tool will show your list of notes ordered by due date, just like the web interface.

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
