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

export const updateBudgetData = async (req, res, next) => {
 
  try {
    const { budgetGoal, monthlyTracking, transactions } = req.body;

    const updatedBudget = await Budget.findOneAndUpdate(
      { user: req.params.userId }, 
      { budgetGoal, monthlyTracking, transactions },
      { new: true } 
    );

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
