import express from 'express';
import { authenticateUser } from '../middlewares/auth.js';
import { getBudgetData, updateBudgetData } from '../controllers/budget.controller.js';

const budgetRouter = express.Router();


budgetRouter.get('/:userId', authenticateUser, getBudgetData);

budgetRouter.put('/:userId', authenticateUser, updateBudgetData);

export default budgetRouter;