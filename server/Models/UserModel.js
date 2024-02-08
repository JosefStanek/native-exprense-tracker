import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is require"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is require"],
  },
});

userSchema.statics.register = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Enter email and password");
  }
  if (!validator.isEmail(email)) {
    throw Error("Valid email format");
  }

  // end of validation
  const findUser = await this.findOne({ email });
  if (findUser) {
    throw new Error("User exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("Enter email and password");
  }
  // end of validation
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect values");
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    // throw Error("Hesla se neshodují");
    throw Error("Incorrect values");
  }

  return user;
};

export const User = mongoose.model("User", userSchema);
