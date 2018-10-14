# GlanceAction Backend

These are the instructions for executing the backend of GlanceAction.

## Requirements
* NPM
* NodeJS
* Express

## Installation
```
$ npm install
```

## Running the backend

Open the console and navigate into the directory root (the folder "backend"). To run the backend, execute:

```
$ node src/index
```

The server will then be running, and there is no need to start the database manually.

## Running gulp Tasks

There are several gulp tasks included, to lint or minify source files, clean up the build directory and to create a documentation with JSDoc3. Execute the according commands in the console to call these tasks:
```
$ gulp lintSources
$ gulp minifySources
$ gulp cleanBuild
$ gulp createDocumentation
```

## Running unit tests

To execute the implemented unit tests, simply call the following command in the console:

```
$ npm test
```
