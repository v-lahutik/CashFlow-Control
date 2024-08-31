import React, { createContext, useReducer, useEffect } from "react";


const BudgetContext = createContext();

const initialState = JSON.parse(localStorage.getItem('budgetState')) || {
  budgetGoal: 12000, // Default yearly goal
  monthlyTracking: Array.from({ length: 12 }, (_, i) => ({
    month: new Date(0, i).toLocaleString("default", { month: "long" }),
    goal: 1000,
    actualIncome: 0,
    actualExpenses: 0,
    goalMet: false,
  })),
  transactions: [],
};

function budgetReducer(state, action) {
  switch (action.type) {
    case "SET_BUDGET_GOAL":
      const newMonthlyGoal = action.payload / 12;
      return {
        ...state,
        budgetGoal: action.payload,
        monthlyTracking: state.monthlyTracking.map((month) => ({
          ...month,
          goal: newMonthlyGoal,
        })),
      };

    case "ADD_TRANSACTION":
      const updatedTracking = state.monthlyTracking.map((month) => {
        if (month.month === action.payload.month) {
          const newActualIncome =
            action.payload.type === "income"
              ? month.actualIncome + parseFloat(action.payload.amount)
              : month.actualIncome;
          const newActualExpenses =
            action.payload.type === "expenses"
              ? month.actualExpenses + parseFloat(action.payload.amount)
              : month.actualExpenses;

          const goalMet = newActualIncome - newActualExpenses >= month.goal;

          return {
            ...month,
            actualIncome: newActualIncome,
            actualExpenses: newActualExpenses,
            goalMet,
          };
        }
        return month;
      });

      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        monthlyTracking: updatedTracking,
      };

    default:
      return state;
  }
}

const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('budgetState', JSON.stringify(state));
  }, [state]); // This effect runs every time `state` changes

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

export { BudgetContext, BudgetProvider };
