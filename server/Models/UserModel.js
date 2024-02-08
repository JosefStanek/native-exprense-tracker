import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Enter yout email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
