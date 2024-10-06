import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add the user field
  budgetGoal: { type: Number, required: true },
  monthlyTracking: [
    {
      month: { type: String, required: true },
      goal: { type: Number, required: true },
      actualIncome: { type: Number, default: 0 },
      actualExpenses: { type: Number, default: 0 },
      goalMet: { type: Boolean, default: false },
    },
  ],
  transactions: [
    {
      transactionId: { type: String}, //from uuid
      type: { type: String, required: true }, // e.g. "income" or "expenses"
      category: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, required: true },
      month: { type: String, required: true },
    },
  ],
});

const Budget = mongoose.model('Budget', budgetSchema);

export default Budget;
