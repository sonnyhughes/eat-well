var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var SearchRecSchema = new Schema({

  // `title` must be of type String
  name: { type: String,
  required: true
    // `body` must be of type String
  },
  image : {
  	type:String
  },
  url:{
  	type: String
  },
date: { type: Date, default: Date.now }
});

// This creates our model from the above schema, using mongoose's model method
var SearchedRecipes = mongoose.model("SearchedRecipes", SearchRecSchema);

// Export the Note model
module.exports =  SearchedRecipes

