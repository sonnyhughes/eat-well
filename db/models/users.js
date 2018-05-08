var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({

  // `title` must be of type String
  id: { type: String,
  required: true,
  unique: true
  // `body` must be of type String
  },
  
  email: { type: String,
  required: true
},
postedrec:[{
  type: Schema.Types.ObjectId,
  ref: "Recipes"
}],
recentrec:[{
  type: Schema.Types.ObjectId,
  ref: "SearchedRecipes"
}],
savedrec:[{
  type: Schema.Types.ObjectId,
  ref: "SearchedRecipes"
}]
});

// This creates our model from the above schema, using mongoose's model method
var Users = mongoose.model("Users", UserSchema);

// Export the Note model
module.exports =  Users
