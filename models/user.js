import mongoose from "mongoose";
import validator from "validator";

var Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: { type: String, require: true },
  lname: { type: String, require: true },
  email: {
    type: String,
    require: true,
    unique: [true, "Account already exists"],
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: { type: String, require: true },
});

let User;
try {
  User = mongoose.model("User");
} catch (e) {
  User = mongoose.model("User", userSchema);
}

export default User;
