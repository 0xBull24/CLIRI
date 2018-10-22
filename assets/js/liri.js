// NPM Packages
const result = require("dotenv").config();
const inquirer = require('inquirer');
const axios = require('axios');
const Spotify = require('node-spotify-api');
const keys = require('./spotify.js');
const spotify = new Spotify(keys.spotify);


if (result.error) {
    throw result.error
}

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
    switch (answers.menuChoice) {
        case 'Search for a song`s info (spotify-this-song)':
            inquirer.prompt([
                // Get info for the song to be searched for
                {
                    type: 'input',
                    name: 'spotifysong',
                    message: 'What song would you like to search for ?'
                }
            ]).then(response => {
                spotifySearch(response.spotifysong)
            })
            break;
        case 'Search for a movie`s info (movie-this)':

            break;
        case 'Search for a concert`s info':

            break;
        case 'Do what it says':

            break;
    }
}).catch(error => {
    console.log(error)
})

function spotifySearch(song) {

    if (!song) {
        song = 'The Sign'
    }

    spotify
        .search({
            type: 'track',
            query: song,
            limit: 3
        })
        .then(function (response) {
            // console.log(response.tracks);
            let tracks = response.tracks.items;
            // console.log(tracks)
            tracks.forEach(element => {
                song = {}

                // Traverse artist array
                element.artists.forEach(element => {
                    song.artists = element.name
                });

                song.album_name = element.album.name
                song.songtitle = element.name
                song.urlpreview = element.external_urls.spotify

                // Do something with the object
                console.log(song)
            });
        })
        .catch(function (err) {
            console.log(err);
        })
}
