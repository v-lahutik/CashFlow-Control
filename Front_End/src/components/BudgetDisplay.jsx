import { useContext } from "react";
import { BudgetContext } from "../context/Context.jsx";
import CurrentMonth from "./CurrentMonth.jsx";
import { GiReceiveMoney, GiPayMoney, GiCash } from "react-icons/gi";
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
    <div className="bg-white p-4 rounded-lg ring ring-indigo-50 sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto">
      <h1 className="text-center text-3xl font-bold mb-6">
        Yearly Budget Overview
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-start">
        {/* Set Your Yearly Income */}
        <article className="flex flex-col rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-100 p-6 sm:p-8 shadow-lg transition-transform transform hover:scale-105 w-full md:w-64 mb-4 md:mb-0">
          <label
            htmlFor="budgetGoal"
            className="block text-sm font-medium text-gray-900 mb-2 text-center"
          >
            Set your <span className="font-bold text-green-600 ">YEARLY </span>
            income
          </label>
          <input
            value={state.budgetGoal}
            onChange={budgetGoalHandler}
            type="number"
            id="budgetGoal"
            className="mt-1 p-3 rounded-lg border border-gray-300 text-gray-700 text-center sm:text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Set yearly income goal"
          />
          <p className="mt-2 text-gray-600 text-center font-semibold">
            Monthly Income Goal:
            <span className="text-green-600">€{monthlyGoal}</span>
          </p>
        </article>

        {/* Combined Progress Bar and Balance */}
        <article className="flex flex-col rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-100 p-6 sm:p-8 shadow-lg transition-transform transform hover:scale-105 w-full md:w-80 mb-4 md:mb-0">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-green-100 p-4 text-green-600 sm:block icon">
              <BsPiggyBank size={30} />
            </span>
            <h3 className="text-lg font-semibold text-gray-900 text-center">
              Goal Progress
            </h3>
          </div>

          <div className="mt-4 text-center">
            <div className="relative mt-2 w-full max-w-xs mx-auto bg-gray-200 rounded-full h-3">
              <div
                className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
                style={{
                  width: `${Math.min(
                    (difference / state.budgetGoal) * 100,
                    100
                  )}%`,
                }}
              />
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {remainingOrExceeded > 0
                ? `€${remainingOrExceeded.toFixed(2)} left until your goal.`
                : `You have exceeded your goal by €${Math.abs(
                    remainingOrExceeded
                  ).toFixed(2)}.`}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              Balance:
              <span
                className={`font-medium ${
                  difference >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                €{difference.toFixed(2)}
              </span>
            </p>
          </div>
        </article>

        {/* Total Income and Total Expenses */}
        <div className="flex flex-col items-center md:items-start">
          {/* Total Income */}
          <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 w-full sm:w-80 max-w-xs lg:max-w-sm mb-4">
            <div className="flex items-center gap-4">
              <span className="hidden rounded-full bg-green-100 p-4 text-green-600 sm:block icon">
                <GiReceiveMoney size={30} />
              </span>
              <div>
                <p className="text-sm text-gray-500">Total Income</p>
                <p className="text-2xl font-medium text-gray-900">
                  €{totalIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </article>

          {/* Total Expenses */}
          <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 w-full sm:w-80 max-w-xs lg:max-w-sm">
            <div className="flex items-center gap-4">
              <span className="hidden rounded-full bg-red-100 p-4 text-red-600 sm:block icon">
                <GiPayMoney size={30} />
              </span>
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-2xl font-medium text-gray-900">
                  €{totalExpense.toFixed(2)}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>

      <CurrentMonth />
    </div>
  );
}

export default BudgetDisplay;
