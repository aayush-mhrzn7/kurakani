import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./database/connect.js";
import cookieParser from "cookie-parser";
const app = express();
//configurations
const port = process.env.PORT || 8000;
dotenv.config();
connectDB().then(() => {
  console.log("connection has been established");
});
//default middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("/src/uploads"));
app.use(cookieParser());
//routing
import userRouter from "./routes/user.route.js";
app.use("/api/v1", userRouter);
app.listen(port || 8000, () => {
  console.log(`the server is alive in port ${port}`);
});
