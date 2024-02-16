import { Expense } from "../Models/ExpenseModel.js";
export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new Error("unautorizate");
    }

    const expenseTotalPromise = Expense.find({ userId: userId });
    const expensesPromise = Expense.find({
      userId: userId,
      "payment.value": "Expenses",
    }).sort("-createdAt");
    const incomesPromise = Expense.find({
      userId: userId,
      "payment.value": "Income",
    }).sort("createdAt");

    const results = await Promise.allSettled([
      expenseTotalPromise,
      expensesPromise,
      incomesPromise,
    ]);

    const [totalResult, expensesResult, incomesResult] = results;
    const total = totalResult.status === "fulfilled" ? totalResult.value : null;
    const expenses =
      expensesResult.status === "fulfilled" ? expensesResult.value : null;
    const incomes =
      incomesResult.status === "fulfilled" ? incomesResult.value : null;

    if (!total || !expenses || !incomes) {
      throw new Error("Database crashed");
    }

    return res.status(200).json({
      total: total,
      expenses: expenses,
      incomes: incomes,
      totalLength: total.length,
      expenseLength: expenses.length,
      incomeLength: incomes.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getExpenseItem = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    if (!userId || !itemId) {
      return res.status(401).json({
        message: "Missing userId or itemId",
      });
    }

    const item = await Expense.findOne({ userId: userId, _id: itemId });
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }
    return res.status(200).json({
      item,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { userId, category } = req.params;
    if (!userId || !category) {
      return res.status(401).json({
        message: "Unauthorizate",
      });
    }

    const categories = await Expense.find({
      userId: userId,
      "type.value": category,
    })
      .sort("-createdAt")
      .then((categories) => {
        return categories;
      });

    return res.status(200).json({
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const postExpenses = async (req, res) => {
  try {
    const { amount, name, payment, type, userId } = req.body;
    if (
      !amount ||
      !name ||
      !payment.value ||
      !payment.key ||
      !type.value ||
      !type.key ||
      !userId
    ) {
      return res.status(500).json({
        message: "required entry value",
      });
    }
    const expense = await Expense.create({ ...req.body });
    if (expense) {
      return res.status(201).json({
        message: "created",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.statu(404).json({
        message: "Id not found",
      });
    }

    const deletedItem = await Expense.findByIdAndDelete(id);
    res.status(200).json({
      item: deletedItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
  // id
};
export const updateExpenses = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const newItem = req.body;
    console.log(newItem);
    if (!userId || !itemId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const updateItem = await Expense.findByIdAndUpdate(newItem.expenseId, {
      name: newItem.name,
      amount: newItem.amount,
      payment: newItem.payment,
      type: newItem.type,
      userId: newItem.userId,
    });

    if (updateItem) {
      return res.status(200).json({
        message: "Update success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
