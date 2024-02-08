import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import expenseRoute from "./Routes/ExpenseRoute.js";
import authRoute from "./Routes/AuthRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(
  cors({
    origin: "192.168.0.80:8081",
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);
app.use(express());

// Routes
app.get("/", (req, res) => {
  console.log(req);
  res.status(200).json({
    message: "all its ok",
  });
});

app.use("/expense", expenseRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`DB and server runnig on port ${port}`);
});
