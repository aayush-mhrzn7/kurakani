import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT.js";

import {
  changeAvatar,
  changePassword,
  getUserDetails,
  login,
  signup,
} from "../controller/user.controller.js";
import upload from "../middleware/multer.js";
const router = Router();

router.post("/signup", upload.single("avatar"), signup);
router.post("/login", login);
router.patch("/change-password", verifyJWT, changePassword);
router.patch(
  "/change-avatar",
  verifyJWT,
  upload.single("avatar"),
  changeAvatar
);
router.get("/get-user", verifyJWT, getUserDetails);
export default router;
