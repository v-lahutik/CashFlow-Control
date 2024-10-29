import User from "../models/users.model.js";
import { createToken } from "../utils/jwt.js";
import { createError, generateVerificationToken, sendEmail } from "../utils/helper.js";
import Verify from "../models/verify.model.js";
import Budget from "../models/budget.model.js";

export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const newUser = await User.create({ firstName, lastName, email, password });

    // Create initial budget data for the user
    const initialBudgetData = {
      user: newUser._id,
      budgetGoal: 12000,
      monthlyTracking: Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "long" }),
        goal: 1000,
        actualIncome: 0,
        actualExpenses: 0,
        goalMet: false,
      })),
      transactions: [],
    };
    const budget = await Budget.create(initialBudgetData);

    // Generate verification token and send email
    const verificationToken = await generateVerificationToken(newUser);
    await sendEmail(newUser, verificationToken);

    
    res.status(201).json({
      message: "Registration successful. Please verify your email to login.",
      user: { id: newUser._id, firstName, lastName, email },
      budgetData: budget,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

  export const verifyAccount = async(req, res, next) => {
    try {
      const { vtoken: token, uid: userId } = req.params;
     
  
      const verified = await Verify.findOne({ token, userId });
      if (!verified) {
        throw createError('Verification link is not valid or has expired.', 401);
      }
  
      const user = await User.findById(userId);
      if (!user) {
        throw createError('User not found or already deleted.', 404);
      }
  
      if (user.is_activated) {
        throw createError('User account is already activated.', 400);
      }
  
      user.is_activated = true;
      await user.save();
  
       res.status(200).json({
      status: 'verify-account-success',
      message: 'Your account has been successfully verified.',
    });
    } catch (error) {
      next(error);
    }
  };
  

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: "Email or Password is incorrect" });
    }
    if (!user.is_activated) {
      return res.status(403).json({ error: "Please verify your email before logging in." });
    }
    const isMatch = await user.comparePass(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Email or Password is incorrect" });
    }

    const token = await createToken(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3_600_000 * 24), // 1 day
      secure: true,
      sameSite: "None"
      
    })
      .json({ status: "You logged in successfully", user: { id: user._id, email: user.email } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", { path: '/' }) // Ensure path matches cookie settings
       .status(200)
       .json({ status: "logout-success" });
  } catch (error) {
    next(error);
  }
};


