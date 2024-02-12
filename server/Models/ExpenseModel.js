import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ExpenseSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, "Please login in and try again"],
    },
    type: {
      key: { type: String, required: [true, "Valid type key"] },
      value: { type: String, required: [true, "Valid type value"] },
    },
    payment: {
      key: { type: String, required: [true, "Valid payment key"] },
      value: { type: String, required: [true, "Valid payment value"] },
    },
    amount: {
      type: String,
      required: [true, "Enter your amount"],
    },
    name: {
      type: String,
      required: [true, "Enter your name"],
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Expense", ExpenseSchema);
