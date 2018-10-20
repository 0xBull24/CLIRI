// NPM Packages
const result = require("dotenv").config();
const inquirer = require('inquirer');
const axios = require('axios');

if  (result.error) {
    throw result.error
}

console.log(` The env file is the following: `)
console.log(result.parsed)

var spotify = new Spotify(keys.spotify);
console.log(spotify);