const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  googleID: {
    type: String,
  },
  gitID: { type: String },
  name: { type: String },
  username: {
    type: String,
  },

  password: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);
