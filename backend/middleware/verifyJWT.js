import jwt from "jsonwebtoken";
import config from "../utils/config.js";
const verifyJWT = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    if (!accessToken) {
      return res
        .status(400)
        .json({ message: "the access token failed during verification " });
    }
    const decodedAccessToken = jwt.verify(accessToken, config.jwtSecret);
    if (!decodedAccessToken) {
      return res
        .status(400)
        .json({ message: "the access token failed during verification " });
    }
    req.user = decodedAccessToken;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Fatal Error during Verification" });
  }
};

export default verifyJWT;
