import Budget from "../models/budget.model.js";


export const getBudgetData = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const budgetData = await Budget.findOne({ user: userId });
    if (!budgetData) {
      return res.status(404).json({ error: "Budget data not found" });
    }

    res.status(200).json(budgetData);
  } catch (error) {
    console.error("Error in getBudgetData:", error);
    next(error);
  }
};
//for transaction form 
export const updateBudgetData= async (req, res, next) => {
 
  try {
    const { budgetGoal, monthlyTracking, transactions } = req.body;
    console.log('Request body from updateBudgetData:', req.body); 
    const updatedBudget = await Budget.findOneAndUpdate(
      { user: req.params.userId }, 
      { budgetGoal, monthlyTracking, transactions },
      { new: true } 
    )
    console.log("Updated budget data in DB:", updatedBudget);
    if (!updatedBudget) {
      return res
        .status(404)
        .json({ error: "Budget data not found for this user" });
    }
    res.json(updatedBudget);
  } catch (err) {
    console.error("Error updating budget data:", err);
    res.status(500).json({ error: err.message });
  }
};

//for editing data in the table
export const editBudgetData = async (req, res, next) => {
  try {
    const { transactionId } = req.params;
    const updatedTransaction = req.body;

    console.log('Request body fom  editBudgetData:', req.body);
  console.log('User ID from table:', req.params.userId);

    const updatedBudget = await Budget.findOneAndUpdate(
      { "user": req.params.userId, "transactions._id": transactionId },
      { $set: { "transactions.$": updatedTransaction } }, // update the specific transaction
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(updatedBudget);
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(500).json({ error: err.message });
  }
}



export const deleteTransaction = async (req, res, next) => {
  try {
    const { userId, transactionId } = req.params;
    
    const updatedBudget = await Budget.findOneAndUpdate(
      { user: userId },
      { $pull: { transactions: { _id: transactionId } } }, // Remove the transaction
      { new: true }
    );

    if (!updatedBudget) {
      return res.status(404).json({ error: "Budget not found" });
    }

    res.json(updatedBudget);
  } catch (err) {
    console.error("Error deleting transaction:", err);
    res.status(500).json({ error: err.message });
  }
}