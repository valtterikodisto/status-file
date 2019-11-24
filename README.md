# Status file parser

Shows key information about `/var/lib/dpkg/status` file found in Debian and
Ubuntu systems via HTML interface.

## Demo

[Demo](https://status-file.herokuapp.com/) is hosted in Heroku

## Getting started

Clone the project:

```
git clone https://github.com/valtterikodisto/status-file
```

## Get it up and running

If you <strong>have</strong> status file in `/var/lib/dpkg` you can just hit:

```
npm start
```

If you <strong>don't have</strong> the file or you want to read it elsewhere:

```
npm start path/to/file
```

The default port is 8080 so navigate to localhost:8080

## Test

To run tests:

```
npm test
```
