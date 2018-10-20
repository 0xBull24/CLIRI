// NPM Packages
const result = require("dotenv").config();
const inquirer = require('inquirer');
const axios = require('axios');
require('./spotify.js');

if (result.error) {
    throw result.error
}

// How to use the env files and the properties
console.log(` The env file is the following: `)
console.log(Spotify.id);
console.log(Spotify.secret);

// Menu for the App
inquirer.prompt([
    // Main Menu options
    {
        type: 'list',
        name: 'menuChoice',
        message: 'Which would you like to do with this app?',
        choices: [{
                name: 'Search for a song`s info (spotify-this-song)'
            },
            {
                name: 'Search for a movie`s info (movie-this)'
            },
            {
                name: 'Search for a concert`s info'
            },
            {
                name: 'Do what it says'
            },
            {
                name: 'Exit'
            }
        ]
    }
]).then(answers => {

    // Exit program if asked
    if (answers.menuChoice === 'Exit') {
        console.log('Exiting the application')
        process.exit();
    }

    console.log(`Ok, ${answers.menuChoice}`)

    // Switch statement based on selected answer
}).catch(error => {
    console.log(error)
})