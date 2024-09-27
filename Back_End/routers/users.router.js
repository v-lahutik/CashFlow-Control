import express from 'express';
import {login, logout, register, verifyAccount} from '../controllers/users.controller.js';
import { registerValidation, loginValidation } from '../validations/users.validation.js';
import { handleValidationErrors } from '../middlewares/handleValidationResults.js';
import { authenticateUser } from '../middlewares/auth.js';
import User from '../models/users.model.js';


const userRouter=express.Router();

userRouter.route('/register').post(registerValidation,handleValidationErrors, register)
userRouter.route('/verify/:vtoken/:uid').get(verifyAccount)
userRouter.route('/login').post(loginValidation, login)
userRouter.route('/logout').post(logout)


userRouter.get("/me", authenticateUser, async (req, res) => {
    try {
      const user = await User.findById(req.token_payload.id).select("-password"); // Exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

export default userRouter;