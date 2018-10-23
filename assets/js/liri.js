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
        inquirer.prompt([
            // Get info for the movie to be searched for
            {
                type: 'input',
                name: 'moviename',
                message: 'What movie would you like to search for ?'
            }
        ]).then(response => {
            movieSearch(response.moviename)
        })

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

    if (!song || song == '') {
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
                songInfo = {}

                // Traverse artist array
                element.artists.forEach(element => {
                    songInfo.artists = element.name
                });

                songInfo.album_name = element.album.name
                songInfo.songtitle = element.name
                songInfo.urlpreview = element.external_urls.spotify

                // Do something with the object
                console.log(songInfo)
            });
        })
        .catch(function (err) {
            console.log(err);
        })
}

function movieSearch(movie) {
    if (!movie || movie == '') {
        movie = 'Mr. Nobody'
    }

    let movieUrl = `http://www.omdbapi.com/?apikey=trilogy&t=${movie}&type=movie`;
    let movieInfo = {}

    axios.get(movieUrl)
    .then(response => {
        console.log(response.data)
        movieInfo.title = response.data.Title
        movieInfo.year = response.data.Year
        movieInfo.imdbRating = response.data.imdbRating

        // Rotten Tomatoes
        response.data.Ratings.forEach(element => {
            // Grab Rotten Tomatoes rating
            if (element.Source === 'Rotten Tomatoes') {
                movieInfo.rtRating = element.Value
            }
        });

        movieInfo.country = response.data.Country
        movieInfo.language = response.data.Language
        movieInfo.plot = response.data.Plot
        movieInfo.actors = response.data.Actors

        // Do something with movie object
        console.log(movieInfo)
    }).catch(err => {
        console.log(err)
    })
}
