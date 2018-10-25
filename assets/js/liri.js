// NPM Packages
const result = require('dotenv').config();
const inquirer = require('inquirer');
const axios = require('axios');
const Spotify = require('node-spotify-api');
const keys = require('./spotify.js');
const spotify = new Spotify(keys.spotify);
const moment = require('moment');
const fs = require('fs');

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
                    name: 'spotifySong',
                    message: 'What song would you like to search for ?'
                }
            ]).then(response => {
                spotifySearch(response.spotifySong)
            })
            break;
        case 'Search for a movie`s info (movie-this)':
            inquirer.prompt([
                // Get info for the movie to be searched for
                {
                    type: 'input',
                    name: 'movieName',
                    message: 'What movie would you like to search for ?'
                }
            ]).then(response => {
                movieSearch(response.movieName)
            })

            break;
        case 'Search for a concert`s info':
            inquirer.prompt([
                // Get info for the movie to be searched for
                {
                    type: 'input',
                    name: 'artistName',
                    message: 'What movie would you like to search for ?'
                }
            ]).then(response => {
                eventSearch(response.movieName)
            })
            break;
        case 'Do what it says':
            doCommand();
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
    let movieInfo = {};

    axios.get(movieUrl)
        .then(response => {
            if (response.data.Response === 'False') {
                console.log(response.data.Error)
            } else {
                console.log(response.data)
                movieInfo.title = response.data.Title;
                movieInfo.year = response.data.Year;
                movieInfo.imdbRating = response.data.imdbRating;

                // Rotten Tomatoes
                response.data.Ratings.forEach(element => {
                    // Grab Rotten Tomatoes rating
                    if (element.Source === 'Rotten Tomatoes') {
                        movieInfo.rtRating = element.Value;
                    }
                });

                movieInfo.country = response.data.Country;
                movieInfo.language = response.data.Language;
                movieInfo.plot = response.data.Plot;
                movieInfo.actors = response.data.Actors;

                // Do something with movie object
                console.log(movieInfo)
            }
        }).catch(err => {
            console.log(err);
        })
}

function eventSearch(artist) {
    if (!artist || artist == '') {
        artist = 'drake';
    }

    artistUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp&date=upcoming`;
    eventInfo = {};

    axios.get(artistUrl)
        .then(response => {
            if (response.data.includes('error')) {
                console.log('There was an error while searching for this concert event')
            } else {

                console.log(response.data);
                response.data.forEach(element => {
                    // console.log(element.venue)
                    eventInfo.artist = element.lineup[0];
                    eventInfo.venueName = element.venue.name;

                    // If out of USA region will be blank.
                    if (element.venue.region === '') {
                        delete eventInfo.region;
                    } else eventInfo.region = element.venue.region;

                    eventInfo.city = element.venue.city;
                    eventInfo.date = moment(element.venue.datetime).format('L')
                    console.log(eventInfo);
                })
            };
        }).catch(error => {
            console.log(error);
        })

}

function doCommand() {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            console.log(data);
            newData = data.split(',');

            for (let count = 0; count <= newData.length - 1; count++) {
                console.log(count)
                if (newData[count].includes('spotify')) {
                    console.log('Looks like we will search for a song')
                    spotifySearch(newData[count + 1]);
                    count++;
                } else if (newData[count].includes('movie')) {
                    movieSearch(newData[count + 1]);
                    count++;
                } else if (newData[count].includes('concert')) {
                    eventSearch(newData[count + 1]);
                    count++;
                }
            }
        }
    })
}