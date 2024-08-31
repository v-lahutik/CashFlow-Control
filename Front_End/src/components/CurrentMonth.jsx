import React, { useContext } from "react";
import { BudgetContext } from "../context/Context.jsx";
import { GiPayMoney, GiCash, GiMoneyStack } from "react-icons/gi";

function CurrentMonth() {
  const { state } = useContext(BudgetContext);

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Format the month for display
  const options = { month: "long" };
  const monthName = new Intl.DateTimeFormat("en-US", options).format(currentDate);

  // Filter transactions for the current month and year
  const currentMonthTransactions = state.transactions.filter((trans) => {
    const transDate = new Date(trans.transaction.date);
    return (
      transDate.getMonth() === currentMonth && transDate.getFullYear() === currentYear
    );
  });

  // Calculate totals for the current month
  const totalIncome = currentMonthTransactions
    .filter((trans) => trans.transaction.type === "income")
    .reduce((acc, trans) => acc + parseFloat(trans.transaction.amount), 0)
    .toFixed(2);

  const totalExpenses = currentMonthTransactions
    .filter((trans) => trans.transaction.type === "expenses")
    .reduce((acc, trans) => acc + parseFloat(trans.transaction.amount), 0)
    .toFixed(2);

  const balance = (totalIncome - totalExpenses).toFixed(2);

  return (
    <div className="bg-gradient-to-r from-green-300 to-blue-300 rounded-lg border border-gray-100 p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{`Current Month Overview for ${monthName} ${currentYear}`}</h2>

      <div className="actual-container flex flex-wrap justify-center gap-4">
        <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 w-full sm:w-80 max-w-xs lg:max-w-sm">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <GiMoneyStack />
            </span>
            <div>
              <p className="text-sm text-gray-500">Saving Goal</p>
              <p className="text-2xl font-medium text-gray-900">
                €{(parseFloat(state.incomeBudget) + parseFloat(state.expensesBudget)).toFixed(2)}
              </p>
            </div>
          </div>
        </article>

        <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 w-full sm:w-80 max-w-xs lg:max-w-sm">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <GiPayMoney />
            </span>
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-medium text-gray-900">
                €{totalExpenses}
              </p>
            </div>
          </div>
        </article>

        <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 w-full sm:w-80 max-w-xs lg:max-w-sm">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <GiCash />
            </span>
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-2xl font-medium text-gray-900">
                €{totalIncome}
              </p>
            </div>
          </div>
        </article>

        <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-4 sm:p-6 lg:p-8 w-full sm:w-80 max-w-xs lg:max-w-sm">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <GiCash />
            </span>
            <div>
              <p className="text-sm text-gray-500">Current Balance</p>
              <p className="text-2xl font-medium text-gray-900">
                €{balance}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default CurrentMonth;
