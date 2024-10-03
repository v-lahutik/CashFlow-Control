import { useContext } from "react";
import { BudgetContext } from "../context/Context.jsx";
import CurrentMonth from "./CurrentMonth.jsx";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { BsPiggyBank } from "react-icons/bs";

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
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const difference = totalIncome + totalExpense;
  const monthlyGoal = (state.budgetGoal / 12).toFixed(2);
  const remainingOrExceeded = state.budgetGoal - difference;

return (
  <div className="flex flex-col w-full pb-4 border-2 border-gray-700 bg-gray-900 text-white">
    <div className="bg-gray-800 p-4 sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto border-b-2 border-gray-700">
      <h2 className="text-center text-2xl font-bold mb-4 py-4 text-white">
        Yearly Budget Overview
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4">
        {/* Set Your Yearly Income */}
        <article className="flex flex-col justify-center items-center rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-700 p-6 sm:p-8 shadow-sm w-full md:w-64 h-48">
          <label
            htmlFor="budgetGoal"
            className="block text-sm font-medium text-gray-300 mb-2 text-center"
          >
            Set your <span className="font-bold text-green-500">YEARLY </span>
            goal
          </label>
          <input
            value={state.budgetGoal}
            onChange={budgetGoalHandler}
            type="number"
            id="budgetGoal"
            className="mt-1 p-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-300 text-center sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Set yearly income goal"
          />
          <p className="mt-2 text-sm text-gray-400 text-center font-semibold">
            Monthly Goal: 
            <span className="text-green-500"> €{monthlyGoal}</span>
          </p>
        </article>

        {/* Progress Bar and Balance */}
        <article className="flex flex-col justify-center items-center rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-700 p-6 sm:p-8 shadow-sm w-full md:w-64 h-48">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-green-800 p-3 text-green-400">
              <BsPiggyBank size={20} />
            </span>
            <h3 className="text-md font-semibold text-gray-300 text-center">
              Goal Progress
            </h3>
          </div>

          <div className="mt-4 text-center">
            <div className="relative mt-2 w-full bg-gray-600 rounded-full h-3">
              <div
                className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                style={{
                  width: `${Math.min(
                    (difference / state.budgetGoal) * 100,
                    100
                  )}%`,
                }}
              />
            </div>

            <p className="text-sm text-gray-400 mt-1">
              {remainingOrExceeded > 0
                ? `€${remainingOrExceeded.toFixed(2)} left until your goal.`
                : `You have exceeded your goal by €${Math.abs(
                    remainingOrExceeded
                  ).toFixed(2)}.`}
            </p>

            <p className="text-sm text-gray-400 mt-4">
              Balance:
              <span
                className={`font-medium ${
                  difference >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                €{difference.toFixed(2)}
              </span>
            </p>
          </div>
        </article>

        {/* Total Income and Total Expenses */}
        <div className="flex flex-col items-center md:items-start gap-1">
          {/* Total Income */}
          <article className="flex items-center justify-between rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-700 p-2 sm:p-4 lg:p-6 w-full sm:w-64 max-w-xs mb-4 md:mb-0 h-24">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-green-800 p-3 text-green-400">
                <GiReceiveMoney size={24} />
              </span>
              <div>
                <p className="text-sm text-gray-400">Total Income</p>
                <p className="text-xl text-center font-medium text-white">
                  €{totalIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </article>

          {/* Total Expenses */}
          <article className="flex items-center justify-between rounded-lg border border-gray-700 bg-gradient-to-br from-gray-800 to-gray-700 p-2 sm:p-4 lg:p-6 w-full sm:w-64 max-w-xs mb-4 md:mb-0 h-24">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-red-800 p-3 text-red-400">
                <GiPayMoney size={24} />
              </span>
              <div>
                <p className="text-sm text-gray-400">Total Expenses</p>
                <p className="text-xl text-center font-medium text-white">
                  €{totalExpense.toFixed(2)}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
    <CurrentMonth />
  </div>
);

}

export default BudgetDisplay;
