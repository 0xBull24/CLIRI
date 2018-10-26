# CLIRI

Command Line API Tool that will be used to search for Song and Artist data on Spotify, movie data using OMDB and music events and concerts using Bands in Town

## Prerequisites

Make sure you have node installed [Node](https://nodejs.org/en/) for your given platform (Mac OSX, Windows, Linux)
Once you have installed open a shell and run the following command

```bash
node -v
```

### Installing

Now that we have node installed lets install all the dependencies by running the following command from the root folder for this project

```bash
npm install
```

## Running the application

This application works in 2 ways:

1. Command line prompt
2. Text file titled `random.txt` in the root folder

In order to run the application just use the following:

```node
node assets\js\liri.js
```

This command will present you with a prompt like so:

![prompt image](https://cl.ly/becacfa333c2/Image%202018-10-25%20at%2011.38.02%20PM.png)

When asked what to search for from the given prompt type in whatever you would like. Ex.

* Search for a song's info - Mob Ties
* Search for a movie's info - Men In Black
* Search for a concert's info - Drake

These would all result in some info regarding the given request. If nothing is given for the input the application has defaults for the request to go grab.

![SamplePrompt](https://cl.ly/992bade78d39/Screen%20Recording%202018-10-25%20at%2011.55.08.90%20PM.gif)

## Built With

* [dotENV](https://www.npmjs.com/package/dotenv) - Env files done easy
* [Axios](https://www.npmjs.com/package/axios) - HTTP Request
* [Inquirer](https://www.npmjs.com/package/inquirer) - Command Line Prompt
* [Moment](https://www.npmjs.com/package/moment) - Time Conversion
* [Spotify](https://www.npmjs.com/package/spotify) - Node Spotify API

## Authors

* **Darron Biles** - [Me](https://github.com/DBiles)
