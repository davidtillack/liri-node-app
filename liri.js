// Read and set any environment variables with the dotenv package
require("dotenv").config();

// Load the external node modules
const Request = require("request");
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");

// Load my keys.js file that contains the API keys
const keys = require("./keys.js");

// Load the file system module to allow files to be accessed
const fs = require("fs");

// Picks up on which function to run based on the user's input
var liriRequest = process.argv[2];

// Picks up the user's input after their function choice
var userInput = process.argv[3];

// Twitter API Requests ================================================================================
function twitterRequest() {
  var client = new Twitter(keys.twitter);

  client.get("statuses/user_timeline", function(error, tweets, response) {
    if (!error) {
      var tweetNumber = 1;

      console.log("");
      console.log("--------------------------------");
      console.log("Here are 20 tweets:");
      console.log("--------------------------------");
      console.log("");

      for (var i = 0; i < tweets.length; i++) {
        console.log("Date of tweet: " + tweets[i].created_at);
        console.log("Tweet content: " + tweets[i].text);
        console.log("Tweet number: " + tweetNumber++);
        console.log("--------------------------------");
        console.log("");
      }
    } else {
      var twitterError = "Oops... something went wrong: " + error;
      console.log(twitterError);
      return;
    }
  });
}

// Capture user input (after / including the third word) for the movie / spotify
for (var i = 4; i < process.argv.length; i++) {
  userInput += process.argv[i];
}

// OMDB API Requests ================================================================================
function OMDBRequest(userInput) {
  if (userInput === "") {
    userInput = "Mr. Nobody";
  }

  var apiKey = "trilogy";

  var OMDBQURL =
    "http://omdbapi.com/?t=" +
    userInput +
    "&plot=full&tomatoes=true&apikey=" +
    apiKey;

  Request(OMDBQURL, function(error, response, body) {
    if (!error) {
      console.log("");
      console.log("----------------------");
      console.log("Movie Information on the " + userInput + ":");
      console.log("----------------------");
      console.log("");
      console.log("Movie Title: " + JSON.parse(body).Title);
      console.log("Year Released: " + JSON.parse(body).Released);
      console.log("Rotton Tomato Rating: " + JSON.parse(body).tomatoRating);
      console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
      console.log("Produced In: " + JSON.parse(body).Country);
      console.log("Featured Actors: " + JSON.parse(body).Actors);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("");
    } else if (JSON.parse(body).Title === undefined) {
      console.log(
        "Erm... Lets say something went wrong here. Try again, perhaps different movie?"
      );
      return;
    } else {
      console.log(
        "Erm... Lets say something went wrong here. Try again, perhaps different movie?"
      );
      return;
    }
  });
}

// Spotify API Requests ================================================================================
function spotifyRequest(userInput) {
  if (userInput === "") {
    userInput = "The Sign";
  }

  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: "track", query: userInput }, function(
    error,
    response
  ) {
    if (!error) {
      var spotifySong = response.tracks.items[0];
      console.log("");
      console.log("----------------------");
      console.log("artists(s): " + spotifySong.artists[0].name);
      console.log("song name: " + spotifySong.name);
      console.log("preview song: " + spotifySong.preview_url);
      console.log("album: " + spotifySong.album.name);
      console.log("----------------------");
      console.log("");
    } else {
      console.log(
        "Erm... Lets say something went wrong here. Try again, perhaps different song?"
      );
      return;
    }
  });
}

function dwis() {
  fs.readFile("./random.txt", "UTF-8", function(error, response) {
    if (!error) {
      var array = response.split(",");
      console.log("");
      console.log(array[1]);
      spotifyRequest(array[1]);
      console.log("");
    } else {
      console.log(error);
      return;
    }
  });
}

// Run the requests appropriately if user's input matches
if (liriRequest === "my-tweets") {
  twitterRequest();
} else if (liriRequest === "movie-this") {
  OMDBRequest(userInput);
} else if (liriRequest === "spotify-this-song") {
  spotifyRequest(userInput);
} else if (liriRequest === "do-what-it-says") {
  dwis();
} else {
  console.log("");
  console.log(
    "Please type again 'node liri.js' and pick one of the options and add [your search term]: "
  );
  console.log("my-tweets");
  console.log("movie-this");
  console.log("spotify-this-song");
  console.log("do-what-it-says");
  console.log("");
}
