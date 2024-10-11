import User from "../models/users.model.js";
import { verifyToken } from "../utils/jwt.js";
import { createError } from "../utils/helper.js";


export const authenticateUser = async (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies) {
   
      return res.status(400).json({
        status: "failure",
        msg: "Cookie does not exist",
      });
    }

    const token = req.cookies.token;

   
    if (!token) {
    
      return res.status(400).json({
        status: "failure",
        msg: "Token does not exist in cookies",
      });
    }

    const token_payload = await verifyToken(token, process.env.JWT_SECRET);

    const user = await User.findById(token_payload.id);
  
    if (!user) {
     
      throw createError("User not found!", 404);
    }

    req.token_payload = token_payload;
    next();
  } catch (error) {
    console.error("Error in authenticateUser:", error);
    next(error);
  }
};