import express from 'express';
import { authenticateUser } from '../middlewares/auth.js';
import { deleteTransaction, editBudgetData, getBudgetData, updateBudgetData } from '../controllers/budget.controller.js';

const budgetRouter = express.Router();

budgetRouter.get('/:userId', authenticateUser, getBudgetData);

budgetRouter.put('/:userId', authenticateUser, updateBudgetData);
budgetRouter.put('/:userId/transaction/:transactionId', authenticateUser, editBudgetData);

budgetRouter.delete('/:userId/transaction/:transactionId', authenticateUser, deleteTransaction);

export default budgetRouter;