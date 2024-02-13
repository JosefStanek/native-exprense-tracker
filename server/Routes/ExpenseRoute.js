import express from "express";
import {
  getExpenses,
  getCategory,
  postExpenses,
  deleteExpenses,
  updateExpenses,
} from "../Controllers/ExpenseController.js";
const router = express.Router();

// get all
router.get("/api/:userId", getExpenses);
// get expense
router.get("/api/:userId/:category", getCategory);

// post expense/income
router.post("/api", postExpenses);
// post delete expense/income
router.delete("/api/:id", deleteExpenses);
// patch expense/income
router.patch("/api/:id", updateExpenses);

export default router;
