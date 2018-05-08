var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var IngredientSchema = new Schema({

  // `title` must be of type String
  ingredient: { type: String,
  required: true
  // `body` must be of type String
  }
});

// This creates our model from the above schema, using mongoose's model method
var Ingredients = mongoose.model("Ingredients", IngredientSchema);

// Export the Note model
module.exports =  Ingredients

 