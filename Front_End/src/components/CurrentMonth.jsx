import React, { useContext } from "react";
import { BudgetContext } from "../context/Context.jsx";
import { GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { BsPiggyBank } from "react-icons/bs";

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

  const progressPercentage = Math.min(
    ((currentMonth.actualIncome / currentMonth.goal) * 100).toFixed(2),
    100
  );
  return (
    <div className=" p-4 rounded-lg sm:p-6 lg:p-8 w-full max-w-screen-xl mx-auto mt-4">
      <h2 className="text-center text-2xl font-bold mb-4 py-4">
        {currentMonthName} Budget Details
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-4">
        {/* Monthly Goal Card */}
        <article className="flex flex-col justify-center items-center rounded-lg text-center border border-gray-200 bg-gradient-to-br from-white to-gray-100 p-6 sm:p-8 shadow-sm w-full md:w-64 h-48">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-green-100 p-4 text-green-600">
              <BsPiggyBank size={30} />
            </span>
            <div>
              <p className="text-sm text-gray-500">Monthly Goal</p>
              <p className="text-xl font-medium text-gray-900">
                €{currentMonth.goal.toFixed(2)}
              </p>
            </div>
          </div>
        </article>

        {/* Goal Progress Card */}
        <article className="flex flex-col justify-center items-center rounded-lg border border-gray-200 bg-gradient-to-br from-white to-gray-100 p-4 sm:p-8 shadow-sm w-full md:w-64 h-48">
          <div className="flex items-center gap-4">
            <span className="rounded-full bg-green-100 p-3 text-green-600">
              <BsPiggyBank size={20} />
            </span>
            <h3 className="text-md font-semibold text-gray-900 text-center">
              Goal Progress
            </h3>
          </div>

          <div className="mt-2 text-center">
            <div className="relative mt-2 w-full bg-gray-200 rounded-full h-3">
              <div
                className="absolute top-0 left-0 h-full bg-green-600 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 mt-1">
              {currentMonth.actualIncome >= currentMonth.goal
                ? `€${(currentMonth.actualIncome - currentMonth.goal).toFixed(
                    2
                  )} over your goal`
                : `€${(currentMonth.goal - currentMonth.actualIncome).toFixed(
                    2
                  )} left until your goal`}
            </p>

            <p className="text-sm text-gray-500 mt-4">
              Balance:
              <span
                className={`font-medium ${
                  currentMonthBalance >= 0 ? "text-green-600" : "text-red-600"
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
          <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-100 p-2 sm:p-4 lg:p-6 w-full sm:w-64 max-w-xs mb-4 md:mb-0 h-24">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-green-100 p-3 text-green-600">
                <GiReceiveMoney size={24} /> 
              </span>
              <div>
              <p className="text-sm text-gray-500">Total Income</p>
          
                <p className="text-xl text-center font-medium text-gray-900">
                  €{currentMonth.actualIncome.toFixed(2)}
                </p>
              </div>
            </div>
          </article>
          {/* Expenses Card */}
          <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-gradient-to-br from-white to-gray-100 p-2 sm:p-4 lg:p-6 w-full sm:w-64 max-w-xs mb-4 md:mb-0 h-24">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-red-100 p-3 text-red-600">
                <GiPayMoney size={24} />
              </span>
              <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-xl text-center font-medium text-gray-900">
                  €{currentMonth.actualExpenses.toFixed(2)}
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
