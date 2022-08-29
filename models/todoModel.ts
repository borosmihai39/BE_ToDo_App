import mongoose from "mongoose";

let Schema = mongoose.Schema;
// To Do schema
const todoSchema = new Schema({
  username: String,
  todo: String,
  isDone: Boolean,
  hasAttachment: Boolean,
});

export let Todos = mongoose.model("Todos", todoSchema);
