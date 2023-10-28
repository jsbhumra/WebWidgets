import mongoose from "mongoose";
import validator from "validator";
import { compare, hash } from "bcryptjs";

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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
  return next();
});

userSchema.methods.comparePassword = async function (password) {
  return await compare(password, this.password);
};

let User;
try {
  User = mongoose.model("User");
} catch (e) {
  User = mongoose.model("User", userSchema);
}

export default User;
