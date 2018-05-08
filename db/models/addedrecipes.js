var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var RecipeSchema = new Schema({

  // `title` must be of type String
  title: { type: String,
  required: true,
  unique: true
  // `body` must be of type String
  },
  
  link: { type: String,
  required: false
},
ingredients: [{
    type: Schema.Types.ObjectId,
  ref: "Ingredients"
  }],
instructions: { type: String,
  required: false
},
date: { type: Date, default: Date.now }
});

// This creates our model from the above schema, using mongoose's model method
var Recipes = mongoose.model("Recipes", RecipeSchema);

// Export the Note model
module.exports =  Recipes


