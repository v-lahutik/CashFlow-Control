import React, { createContext, useReducer, useEffect, useState } from "react";

// Create the Budget context
const BudgetContext = createContext();

// Initial state for the budget
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

// Budget reducer to handle actions
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
                ? month.actualExpenses + Math.abs(parseFloat(action.payload.amount))
                : month.actualExpenses; // Make sure expenses are added positively
      
            const goalMet = newActualIncome - newActualExpenses >= month.goal; // Adjust calculation
      
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

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
      };

    case "EDIT_TRANSACTION":
      const updatedTransactions = state.transactions.map(transaction =>
        transaction.id === action.payload.id
          ? { ...transaction, transaction: action.payload.transaction }
          : transaction
      );
      return {
        ...state,
        transactions: updatedTransactions,
      };

    default:
      return state;
  }
}

// Budget Provider component
const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const [displayedTransaction, setDisplayedTransaction] = useState(state.transactions);

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('budgetState', JSON.stringify(state));
  }, [state]);

  // Add a test transaction for debugging
  // useEffect(() => {
  //   const testTransaction = {
  //     id: 1,
  //     transaction: {
  //       type: "income",
  //       date: "2024-09-01",
  //       category: "Salary",
  //       amount: "5000",
  //     },
  //   };

  //   dispatch({ type: "ADD_TRANSACTION", payload: testTransaction });
  // }, []);

  return (
    <BudgetContext.Provider value={{ state, dispatch, displayedTransaction, setDisplayedTransaction }}>
      {children}
    </BudgetContext.Provider>
  );
};

export { BudgetContext, BudgetProvider };
