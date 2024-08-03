import mongoose from "mongoose";
import config from "../utils/config.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/kurakani");
    console.log("sucessfully connected with the mongodb database");
  } catch (error) {
    console.log("attempt to connect with a database has failed");
  }
};
export default connectDB;
