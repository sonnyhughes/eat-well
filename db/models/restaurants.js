var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var RestaurantSchema = new Schema({

  resID:{
  	type: String,
  required: true

  },


  restaurantinfo: { type: String,
  required: true
    // `body` must be of type String
  },

  date: { type: Date, default: Date.now }
});

// This creates our model from the above schema, using mongoose's model method
var Restaurants = mongoose.model("Restaurants", RestaurantSchema);

// Export the Note model
module.exports =  Restaurants

 