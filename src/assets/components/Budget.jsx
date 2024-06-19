import React, { useContext } from "react";
import { BudgetContext } from "../context/Context";
import {
  GiMoneyStack,
  GiReceiveMoney,
  GiPayMoney,
  GiTakeMyMoney,
  GiCash,
} from "react-icons/gi";
import { BsPiggyBank } from "react-icons/bs";
import { PiChartLineDown, PiChartLineUp } from "react-icons/pi";

function Budget() {
  const { state, dispatch } = useContext(BudgetContext);

  //submit handlers
  const incomeBudgetHandler = (e) => {
    dispatch({
      type: "UPDATE_INCOME_BUDGET",
      payload: parseFloat(e.target.value),
    });
  };
  const expensesBudgetHandler = (e) => {
    dispatch({
      type: "UPDATE_EXPENSES_BUDGET",
      payload: parseFloat(e.target.value),
    });
  };
  //functions
  console.log("state", state);
  const totalAmount = state.transactions
    .reduce((acc, trans) => {
      return (acc += parseFloat(trans.transaction.amount));
    }, 0)
    .toFixed(2);
  const totalIncome = state.transactions
    .reduce((acc, trans) => {
      if (trans.transaction.type === "income") {
        return (acc += parseFloat(trans.transaction.amount));
      }
      return acc;
    }, 0)
    .toFixed(2);

  const totalExpense = state.transactions
    .reduce((acc, trans) => {
      if (trans.transaction.type === "expenses") {
        return (acc += parseFloat(trans.transaction.amount));
      }
      return acc;
    }, 0)
    .toFixed(2);

  const savingGoal = (
    state.incomeBudget - Math.abs(state.expensesBudget)
  ).toFixed(2);

  const difference = (savingGoal - totalAmount).toFixed(2);
  


  return (
    <div className="bg-gradient-to-r from-green-300 to-blue-300  rounded border rounded-s  p-4 ring ring-indigo-50 sm:p-6 lg:p-8 h-full w-full">
      <p className="mt-1 text-sm text-gray-700 w-74 text-center p-3">
        Set your monthly income budget, expense budget, and savings goal to plan
        your finances.
      </p>

      <div className="budget-container">
        <article className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6 w-80 h-36">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <GiMoneyStack />
            </span>

            <div>
              <p className="text-sm text-gray-500">Your income budget</p>
              <p className="text-2xl font-medium text-gray-900">
                €{parseFloat(state.incomeBudget || 0).toFixed(2)}
              </p>
              <label
                htmlFor="incomeBudget"
                className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-green-300"
              >
                <input
                  value={state.incomeBudget}
                  onChange={incomeBudgetHandler}
                  type="number"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  required
                />

                <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"></span>
              </label>
            </div>
          </div>
        </article>
        <article className="flex items-end justify-between rounded-lg border border-gray-100 bg-white p-6 w-80">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <GiTakeMyMoney />
            </span>

            <div>
              <p className="text-sm text-gray-500">Your expenses budget</p>
              <p className="text-2xl font-medium text-gray-900">
                €{parseFloat(state.expensesBudget || 0).toFixed(2)}
              </p>
              <label
                htmlFor="incomeBudget"
                className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-green-300"
              >
                <input
                  value={state.expensesBudget}
                  onChange={expensesBudgetHandler}
                  type="number"
                  className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                  required
                />

                <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"></span>
              </label>
            </div>
          </div>
        </article>
        <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-6 w-80 h-36">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <BsPiggyBank />
            </span>

            <div>
              <p className="text-sm text-gray-500">Saving goal</p>
              <p className="text-2xl font-medium text-gray-900">
                €{savingGoal}
              </p>
            </div>
          </div>
        </article>
      </div>
      <p className="mt-1 text-sm text-gray-700 w-74 text-center p-3">
        Then, track your actual income, actual expenses, and balance to see how
        well you are following your plan.
      </p>

      <div className="actual-container">
        <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-6 w-80 h-36">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <GiReceiveMoney />
            </span>

            <div>
              <p className="text-sm text-gray-500">Total income</p>
              <p className="text-2xl font-medium text-gray-900">
                €{totalIncome}
              </p>
            </div>
          </div>
        </article>
        <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-6 w-80 h-36">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <GiPayMoney />
            </span>

            <div>
              <p className="text-sm text-gray-500">Total expenses</p>
              <p className="text-2xl font-medium text-gray-900">
                €{totalExpense}
              </p>
            </div>
          </div>
        </article>

        <article className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-6  w-80 h-36">
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full bg-gray-100 p-3 text-gray-600 sm:block icon">
              <GiCash />
            </span>

            <div>
              <p className="text-sm text-gray-500">Total balance</p>
              <p className="text-2xl font-medium text-gray-900">
                €{totalAmount}
              </p>
            </div>
          </div>
        </article>
      </div>
      <p className="mt-1 text-sm text-gray-700 w-74 text-center p-3">
        Compare the difference between your goal and actual totals to determine
        if you have achieved your financial objectives.
      </p>
      <div className="conclusion-container">
        <article
          className={`flex items-center justify-between rounded-lg border-2 bg-white p-6 h-36 ${
            difference < 1 ? "border-green-300" : "border-red-300"
          }`}
        >
          <div className="flex items-center gap-4">
            <span className="hidden rounded-full p-3 text-gray-600 sm:block icon bg-gray-100 ">
              {difference < 1 ? <PiChartLineUp /> : <PiChartLineDown />}
            </span>
            <div>
              <p className="text-sm text-gray-500">
                {difference <= 1
                  ? "Positive balance"
                  : difference >= 1
                  ? "Negative balance"
                  : "Neutral balance"}
              </p>
              <p className="text-2xl font-medium text-gray-900">
                € {difference}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default Budget;
