//this file is for creating schemas and then model  and export that model using mongoose

const mongoose = require("mongoose");

//creating a user schema

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: Number,
    default: 0,
  },
  color:{
    type:String,
    default:"none",
  }
});

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  tasks: {
    type: [taskSchema],
    default:[],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
