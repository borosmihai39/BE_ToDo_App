import mongoose from "mongoose";

let Schema = mongoose.Schema;
// To Do schema
const messageSchema = new Schema({
  message: String,
  email: String,
});

let ContactMessages = mongoose.model("ContactMessages", messageSchema);

export default ContactMessages;
