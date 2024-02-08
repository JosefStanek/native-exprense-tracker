import express from "express";
import {
  getExpenses,
  getExpense,
  getIncome,
  postExpenses,
  deleteExpenses,
  updateExpenses,
} from "../Controllers/ExpenseController.js";
const router = express.Router();

// get all
router.get("api", getExpenses);
// get expense
router.get("api/exp", getExpense);
// get income
router.get("api/inc", getIncome);
// post expense/income
router.post("api", postExpenses);
// post delete expense/income
router.delete("api/:id", deleteExpenses);
// patch expense/income
router.patch("api/:id", updateExpenses);

export default router;
