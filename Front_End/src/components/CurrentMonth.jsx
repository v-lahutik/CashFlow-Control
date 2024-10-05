import React, { useContext } from "react";
import { BudgetContext } from "../context/Context.jsx";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { BsPiggyBank } from "react-icons/bs";

function CurrentMonth() {
  const { state } = useContext(BudgetContext);

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  // Filter transactions for the current month and by type (income/expenses)
  const currentMonthTransactions = state.transactions.filter(
    (transaction) => {
      const transactionMonth = new Date(transaction.date).toLocaleString(
        "default",
        { month: "long" }
      );
      return transactionMonth === currentMonthName;
    }
  );

  const currentMonthIncome = currentMonthTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const currentMonthExpenses = currentMonthTransactions
    .filter((transaction) => transaction.type === "expenses")
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const currentMonth = state.monthlyTracking.find(
    (month) => month.month === currentMonthName
  ) || {
    goal: 0,
  };

  const currentMonthBalance = currentMonthIncome + currentMonthExpenses; 
  const progressPercentage = Math.min(
    ((currentMonthIncome / currentMonth.goal) * 100).toFixed(2),
    100
  );

  return (
    <div className="p-4 rounded-lg sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto mt-4 shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-4 py-4 text-white">
        {currentMonthName} Budget Details
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4">
        {/* Monthly Goal Card */}
        <article className="flex flex-col justify-center items-center rounded-lg text-center border border-blue-300 bg-gradient-to-br from-green-200 to-blue-200 p-6 sm:p-8 shadow-md w-full md:w-64 h-48">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-green-100 p-4 text-green-700">
              <BsPiggyBank size={30} />
            </span>
            <div>
              <p className="text-sm text-gray-600">Monthly Goal</p>
              <p className="text-xl font-medium text-gray-900">
                €{currentMonth.goal.toFixed(2)}
              </p>
            </div>
          </div>
        </article>

        {/* Goal Progress Card */}
        <article className="flex flex-col justify-center items-center rounded-lg border border-blue-300 bg-gradient-to-br from-green-200 to-blue-200 p-4 sm:p-8 shadow-md w-full md:w-64 h-48">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-green-100 p-3 text-green-700">
              <BsPiggyBank size={20} />
            </span>
            <h3 className="text-md font-semibold text-gray-900 text-center">
              Goal Progress
            </h3>
          </div>

          <div className="mt-2 text-center">
            <div className="relative mt-2 w-full bg-gray-300 rounded-full h-3">
              <div
                className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {currentMonthIncome >= currentMonth.goal
                ? `€${(currentMonthIncome - currentMonth.goal).toFixed(2)} over your goal`
                : `€${(currentMonth.goal - currentMonthIncome).toFixed(2)} left until your goal`}
            </p>

            <p className="text-sm text-gray-600 mt-4">
              Balance:
              <span
                className={`font-medium ${
                  currentMonthBalance >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                €{currentMonthBalance.toFixed(2)}
              </span>
            </p>
          </div>
        </article>

        {/* Income and Expenses Cards */}
        <div className="flex flex-col items-center md:items-start gap-1">
          {/* Income Card */}
          <article className="flex items-center justify-between rounded-lg border border-green-300 bg-gradient-to-br from-green-200 to-white p-2 sm:p-4 lg:p-6 w-full sm:w-64 max-w-xs mb-4 md:mb-0 h-24 shadow-md">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-green-100 p-3 text-green-700">
                <GiReceiveMoney size={24} />
              </span>
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-xl text-center font-medium text-gray-900">
                  €{currentMonthIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </article>
          {/* Expenses Card */}
          <article className="flex items-center justify-between rounded-lg border border-red-300 bg-gradient-to-br from-red-200 to-white p-2 sm:p-4 lg:p-6 w-full sm:w-64 max-w-xs mb-4 md:mb-0 h-24 shadow-md">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-red-100 p-3 text-red-700">
                <GiPayMoney size={24} />
              </span>
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-xl text-center font-medium text-gray-900">
                  €{currentMonthExpenses.toFixed(2)}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default CurrentMonth;
