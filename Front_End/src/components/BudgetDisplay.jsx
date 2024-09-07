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
    <div className= "flex flex-col w-full pb-4">
    <div className=" bg-white p-4 rounded-lg ring ring-indigo-50 sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto">
       <h2 className="text-center text-2xl font-bold mb-4 py-4">
        Yearly Budget Overview
      </h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4">
        {/* Set Your Yearly Income */}
        <article className="flex flex-col justify-center items-center rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-100 p-6 sm:p-8 shadow-sm w-full md:w-64 h-48">
          <label
            htmlFor="budgetGoal"
            className="block text-sm font-medium text-gray-900 mb-2 text-center"
          >
            Set your <span className="font-bold text-green-600">YEARLY </span>
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

        {/* Progress Bar and Balance */}
        <article className="flex flex-col justify-center items-center rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-100 p-6 sm:p-8 shadow-sm w-full md:w-64 h-48">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-green-100 p-3 text-green-600">
              <BsPiggyBank size={20} />
            </span>
            <h3 className="text-md font-semibold text-gray-900 text-center">
              Goal Progress
            </h3>
          </div>

          <div className="mt-4 text-center">
            <div className="relative mt-2 w-full bg-gray-200 rounded-full h-3">
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
        <div className="flex flex-col items-center md:items-start gap-1">
          {/* Total Income */}
          <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-100 p-2 sm:p-4 lg:p-6 w-full sm:w-64 max-w-xs mb-4 md:mb-0 h-24">
            <div className="flex items-center gap-4">
            <span className="rounded-full bg-green-100 p-3 text-green-600">
                <GiReceiveMoney size={24} />
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
          <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-100 p-2 sm:p-4 lg:p-6 w-full sm:w-64 max-w-xs mb-4 md:mb-0 h-24">
            <div className="flex items-center gap-4">
            <span className="rounded-full bg-red-100 p-3 text-red-600">
                <GiPayMoney size={24} />
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

      
    </div>
    <CurrentMonth />
    </div>
  );
}

export default BudgetDisplay;
