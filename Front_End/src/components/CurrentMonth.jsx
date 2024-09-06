import React, { useContext } from "react";
import { BudgetContext } from "../context/Context.jsx";
import {
  GiMoneyStack,
  GiReceiveMoney,
  GiPayMoney,
  GiCash,
} from "react-icons/gi";

function CurrentMonth() {
  const { state } = useContext(BudgetContext);

  const currentMonthName = new Date().toLocaleString("default", {
    month: "long",
  });

  const currentMonth = state.monthlyTracking.find(
    (month) => month.month === currentMonthName
  ) || {
    actualIncome: 0,
    actualExpenses: 0,
    goal: 0,
  };

  const currentMonthBalance =
    currentMonth.actualIncome - Math.abs(currentMonth.actualExpenses);

  const remainingOrExceededForMonth = currentMonthBalance - currentMonth.goal;

  const currentMonthGoalMessage =
    remainingOrExceededForMonth >= 0
      ? `You are €${remainingOrExceededForMonth.toFixed(
          2
        )} over your goal for ${currentMonthName}.`
      : `You are €${Math.abs(remainingOrExceededForMonth).toFixed(
          2
        )} under your goal for ${currentMonthName}.`;

  const progressPercentage = Math.min(
    ((currentMonth.actualIncome / currentMonth.goal) * 100).toFixed(2),
    100
  );

  return (
    <div className="bg-white p-4 rounded-lg ring ring-indigo-50 sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto mt-4">
      <h2 className="text-center text-2xl font-bold mb-4">
        {currentMonthName} Budget Details
      </h2>
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row justify-around w-full">
          {/* Income Card */}
          <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-100 p-4 sm:p-6 lg:p-8 w-full sm:w-80 max-w-xs lg:max-w-sm mb-4 md:mb-0">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-green-100 p-4 text-green-600">
                <GiReceiveMoney size={30} />
              </span>
              <div>
                <p className="text-sm text-gray-500">This month’s income</p>
                <p className="text-2xl font-medium text-gray-900">
                  €{currentMonth.actualIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </article>

          {/* Expenses Card */}
          <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-100 p-4 sm:p-6 lg:p-8 w-full sm:w-80 max-w-xs lg:max-w-sm mb-4 md:mb-0">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-red-100 p-4 text-red-600">
                <GiPayMoney size={30} />
              </span>
              <div>
                <p className="text-sm text-gray-500">This month’s expenses</p>
                <p className="text-2xl font-medium text-gray-900">
                  €{currentMonth.actualExpenses.toFixed(2)}
                </p>
              </div>
            </div>
          </article>

          {/* Balance Card */}
          <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-100 p-4 sm:p-6 lg:p-8 w-full sm:w-80 max-w-xs lg:max-w-sm">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-blue-100 p-4 text-blue-600">
                <GiCash size={30} />
              </span>
              <div>
                <p className="text-sm text-gray-500">Balance</p>
                <p
                  className={`text-2xl font-medium ${
                    currentMonthBalance >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  €{currentMonthBalance.toFixed(2)}
                </p>
              </div>
            </div>
          </article>
        </div>

        <article className="flex flex-col rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-100 p-6 sm:p-8 shadow-lg transition-transform transform hover:scale-105 w-full sm:w-80 max-w-xs lg:max-w-sm mb-4 md:mb-0">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-gray-100 p-4 text-green-600">
              <GiMoneyStack size={30} />
            </span>
            <div>
              <p className="text-sm text-gray-500">Monthly Goal</p>
              <p className="text-2xl font-medium text-gray-900">
                €{currentMonth.goal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative mt-2 w-full bg-gray-200 rounded-full h-3">
            <div
              className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <p className="text-sm text-gray-600 mt-1 text-center">
            {currentMonth.actualIncome >= currentMonth.goal
              ? `€${(currentMonth.actualIncome - currentMonth.goal).toFixed(
                  2
                )} over`
              : `€${(currentMonth.goal - currentMonth.actualIncome).toFixed(
                  2
                )} left`}
          </p>
        </article>
      </div>
    </div>
  );
}

export default CurrentMonth;
