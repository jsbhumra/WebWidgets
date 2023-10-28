import mongoose from "mongoose";
var Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

var User = mongoose.model("User", userSchema);
export default User;
