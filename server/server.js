import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import expenseRoute from "./Routes/ExpenseRoute.js";
import authRoute from "./Routes/AuthRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

// Middlewares
app.use(
  cors({
    origin: "192.168.0.80:8081",
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  console.log(req);
  res.status(200).json({
    message: "all its ok",
  });
});
app.use("/expense", expenseRoute);
app.use("/auth", authRoute);

// db
mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`DB and server runnig on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
