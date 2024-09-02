import { useContext } from "react";
import { BudgetContext } from "../context/Context.jsx";
import CurrentMonth from "./CurrentMonth.jsx";

function BudgetDisplay() {
  const { state, dispatch } = useContext(BudgetContext);

  const budgetGoalHandler = (e) => {
    const newBudgetGoal = parseFloat(e.target.value);
    if (!isNaN(newBudgetGoal)) {
      dispatch({
        type: "SET_BUDGET_GOAL",
        payload: newBudgetGoal,
      });
    }
  };

  const totalIncome = state.transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const totalExpense = state.transactions
    .filter((transaction) => transaction.type === "expenses")
    .reduce((acc, curr) => acc + Math.abs(parseFloat(curr.amount)), 0);

  const difference = totalIncome - totalExpense;
  const monthlyGoal = (state.budgetGoal / 12).toFixed(2);

  // Calculate how much is left or exceeded
  const remainingOrExceeded = state.budgetGoal - difference;

  const goalMessage =
    remainingOrExceeded > 0
      ? `You have €${remainingOrExceeded.toFixed(2)} left until you reach your goal.`
      : `You have exceeded your goal by €${Math.abs(remainingOrExceeded).toFixed(2)}.`;

  return (
    <div className="bg-white p-4 rounded-lg ring ring-indigo-50 sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto">
      {console.log("state", state)}
      <h1 className="text-center text-3xl font-bold mb-6">Budget Overview</h1>
      <div className="flex flex-col md:flex-row justify-around">
        <div className="mb-4 md:mb-0">
          <label htmlFor="budgetGoal" className="block text-sm font-medium text-gray-900">
            Set Yearly Budget Goal
          </label>
          <input
            value={state.budgetGoal}
            onChange={budgetGoalHandler}
            type="number"
            id="budgetGoal"
            className="mt-1 p-3 w-full md:w-64 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
            placeholder="Set yearly budget goal"
          />
          <p className="mt-2 text-gray-600">Monthly Budget Goal: €{monthlyGoal}</p>
        </div>

        <div className="text-center">
          <p className="text-xl font-semibold">Total Income: €{totalIncome.toFixed(2)}</p>
          <p className="text-xl font-semibold">Total Expenses: €{totalExpense.toFixed(2)}</p>
          <p className={`text-xl font-semibold ${difference >= 0 ? "text-green-600" : "text-red-600"}`}>
            Balance: €{difference.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Display the message about remaining or exceeded goal */}
      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">{goalMessage}</p>
      </div>

      {/* Add the CurrentMonthBudget component here */}
      <CurrentMonth />
    </div>
  );
}

export default BudgetDisplay;
