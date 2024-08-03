import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import {
  changePassword,
  getUserDetails,
  login,
  signup,
} from "../controller/user.controller.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/change-password", verifyJWT, changePassword);
router.get("/get-user", verifyJWT, getUserDetails);
export default router;
