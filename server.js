const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const request = require('request');
//const apiRoutes = require("./api/routes/index.js");


// Serve up static assets
app.use(express.static("client/build"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Use apiRoutes
require("./api/routes/restaurantsAPI.js")(app)
require("./db/routes/dbroutes.js")(app)
require("./api/routes/recipesAPI.js")(app)


// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB

mongoose.Promise = Promise;

if(process.env.MONGODB_URI){
	mongoose.connect(process.env.MONGODB_URI)
}
else{
mongoose.connect("mongodb://localhost/eatwell_db")
}

var database = mongoose.connection;

database.on('error', function(err){
	console.log(err)
})

database.once('open',function(){
	console.log('success')
})





// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



app.listen(PORT, function() {
  console.log(`🌎😝😎😰🤯🤫 ==> Server now on port ${PORT}!`);
});
