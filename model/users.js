const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: true,
  },
  image: { type: String, required: true },
  createdAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("users", userSchema);
