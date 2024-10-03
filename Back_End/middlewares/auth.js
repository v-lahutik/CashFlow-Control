import User from "../models/users.model.js";
import { verifyToken } from "../utils/jwt.js";
import { createError } from "../utils/helper.js";


export const authenticateUser = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    //  console.log("req data:", req.cookies);

    if (!cookies) {
      console.log("No cookies found");
      return res.status(400).json({
        status: "failure",
        msg: "Cookie does not exist",
      });
    }

    const token = req.cookies.token;
    // console.log("Token from cookies:", token);
   
    if (!token) {
      console.log("No token found in cookies");
      return res.status(400).json({
        status: "failure",
        msg: "Token does not exist in cookies",
      });
    }

    const token_payload = await verifyToken(token, process.env.JWT_SECRET);
    // console.log("Token Payload:", token_payload);

    const user = await User.findById(token_payload.id);
    // console.log("User from DB:", user);

    if (!user) {
      console.log("User not found");
      throw createError("User not found!", 404);
    }

    req.token_payload = token_payload;
    next();
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    next(error);
  }
};