# 4tw-text-unwrap

> Unwraps exported 4tw text files

When you export writing as plaintext (.txt) files from [4thewords](https://4thewords.com/), the exported files automatically wrap columns at 70 characters long. Manually unwrapping these files to import into a program like Scrivener can be frustrating.

Paste the contents of an exported text file onto the site, click unwrap, then copy the unwrapped text into whatever program you want.

This repo contains the source code for the site and a python script (4tw_unwrap.py) that lets you unwrap text files via the command line.

## Python script usage

``` bash
# Unwrap a file
python3 4tw_unwrap.py filename
```

By default, the python script will save the unwrapped version of filename.txt as filename-unwrap.txt

``` bash
# Unwrap a file to a specific output file
python3 4tw_unwrap.py filename outputfilename
```

The script will look in the local directory first. If it can't find the file in the local directory it will attempt to find it in your default downloads directory. You can force it to look in the downloads directory with the flag -D. It will save the unwrapped file in the local directory or the downloads directory if that is where the script found the input file.

## Building the site from source

The website is built with [Nuxt](https://nuxtjs.org). To build, clone the repo and run:

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
