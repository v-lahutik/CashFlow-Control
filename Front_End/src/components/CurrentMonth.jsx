import React, { useContext } from "react";
import { BudgetContext } from "../context/Context.jsx";

function CurrentMonth() {
  const { state } = useContext(BudgetContext);

  // Get the current month name
  const currentMonthName = new Date().toLocaleString("default", { month: "long" });

  // Find the budget details for the current month
  const currentMonth = state.monthlyTracking.find(month => month.month === currentMonthName);

  // Calculate the balance for the current month
  const currentMonthBalance = currentMonth.actualIncome - Math.abs(currentMonth.actualExpenses);

  // Determine whether the balance is over or under the goal
  const remainingOrExceededForMonth = currentMonthBalance - currentMonth.goal;

  const currentMonthGoalMessage =
    remainingOrExceededForMonth >= 0
      ? `You are €${remainingOrExceededForMonth.toFixed(2)} over your goal for ${currentMonthName}.`
      : `You are €${Math.abs(remainingOrExceededForMonth).toFixed(2)} under your goal for ${currentMonthName}.`;

  return (
    <div className="bg-white p-4 rounded-lg ring ring-indigo-50 sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto mt-4">
      <h2 className="text-center text-2xl font-bold mb-4">{currentMonthName} Budget Details</h2>
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold">Goal: €{currentMonth.goal.toFixed(2)}</p>
        <p className="text-xl font-semibold">Actual Income: €{currentMonth.actualIncome.toFixed(2)}</p>
        <p className="text-xl font-semibold">Actual Expenses: €{currentMonth.actualExpenses.toFixed(2)}</p>
        <p className={`text-xl font-semibold ${currentMonthBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
          Balance: €{currentMonthBalance.toFixed(2)}
        </p>
        <p className="mt-2 text-lg font-semibold">{currentMonthGoalMessage}</p>
      </div>
    </div>
  );
}

export default CurrentMonth;

