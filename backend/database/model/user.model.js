import mongoose from "mongoose";
import path from "path";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/flat-style-woman-avatar_90220-2876.jpg?w=826&t=st=1722705005~exp=1722705605~hmac=c9e382c18934791635b58b9cb784c85c73bf7f1093228a2cfca4c4187d27597e",
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
