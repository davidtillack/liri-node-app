// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Load the external node modules 
const Request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');

// Load my keys.js file that contains the API keys
const keys = require("./keys.js");

// Load the file system module to allow files to be accessed
const fs = require('fs');

var liriRequest = process.argv[2];

// Twitter API Requests ================================================================================
function twitterRequest() {
    
    var client = new Twitter(keys.twitter);

	client.get('statuses/user_timeline', function (error, tweets, response) {
		if (!error) {
            var tweetNumber = 1;

            console.log("")
            console.log("--------------------------------")
            console.log("Here are 20 tweets:")
            console.log("--------------------------------")
            console.log("")
            
             for (var i = 0; i < tweets.length; i++) {
				console.log("Date of tweet: " + tweets[i].created_at)
                console.log("Tweet content: " + tweets[i].text)
                console.log("Tweet number: " + tweetNumber++)
                console.log("--------------------------------")
                console.log("")
            } 
        }   else {
            var twitterError = "Oops... something went wrong: " + error;
			console.log(twitterError);
			return;
		}
	});
}

// OMDB API Requests ================================================================================
function OMDBRequest(val){
    if (!error) {
        
         
    }   else {
        return;
    }
}


// Spotify API Requests ================================================================================
function spotifyRequest(){
    if (!error) {
         
    }   else {
        return;
    }
}

// Run the requests appropriately if user's input matches
if (liriRequest === "my-tweets") {
    twitterRequest();
}