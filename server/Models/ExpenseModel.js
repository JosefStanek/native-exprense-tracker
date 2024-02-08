import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ExpenseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: [true, "Enter your type"],
    },
    value: {
      type: String,
      required: [true, "Enter your value"],
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model("Exprense", ExpenseSchema);
