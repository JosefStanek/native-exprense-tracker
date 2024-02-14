import { Expense } from "../Models/ExpenseModel.js";
export const getExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorizate",
      });
    }

    const [total, expenses, incomes] = await Promise.all([
      Expense.find({ userId: userId }),
      Expense.find({ userId: userId, "payment.value": "Expenses" })
        .sort("-createdAt")
        .then((expenses) => {
          return expenses;
        }),
      Expense.find({ userId: userId, "payment.value": "Income" })
        .sort("createdAt")
        .then((incomes) => {
          return incomes;
        }),
    ]);

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
      !amount |
      !name |
      !payment.value |
      !payment.key |
      !type.value |
      !type.key |
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
  //id
};
