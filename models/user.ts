const mongoose = require("mongoose");
const Todos = require("../models/todoModel");
const Schema = mongoose.Schema;
// user schema
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todos" }],
});

export default mongoose.model("User", UserSchema);
