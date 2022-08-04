const mongoose = require("mongoose");

let Schema = mongoose.Schema;
// To Do schema
const todoSchema = new Schema({
  username: String,
  todo: String,
  isDone: Boolean,
  hasAttachment: Boolean,
});

let Todos = mongoose.model("Todos", todoSchema);

module.exports = Todos;
