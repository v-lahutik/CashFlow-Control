import React, { createContext, useReducer, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import axios from "axios";

const BudgetContext = createContext();


const initialState = {
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
    // case "SET_BUDGET_GOAL":
    //   const newMonthlyGoal = action.payload / 12;
    //   return {
    //     ...state,
    //     budgetGoal: action.payload,
    //     monthlyTracking: state.monthlyTracking.map((month) => ({
    //       ...month,
    //       goal: newMonthlyGoal,
    //     })),
    //   };
      case "SET_BUDGET_DATA": {
        return {
          ...state,
          ...action.payload, // Spread the incoming data into the state
          // If you need to do any calculations, do it here
          monthlyTracking: action.payload.monthlyTracking.map((month) => ({
            ...month,
            goal: action.payload.budgetGoal / 12, // Set monthly goal if needed
          })),
        };
      }

      case "ADD_TRANSACTION": {
        const newTransaction = {
            ...action.payload,
            id: Date.now(), 
        };
    
        const updatedTracking = state.monthlyTracking.map((month) => {
            if (month.month === action.payload.month) {
                const newActualIncome =
                    action.payload.type === "income"
                        ? month.actualIncome + parseFloat(action.payload.amount) 
                        : month.actualIncome;
    
                const newActualExpenses =
                    action.payload.type === "expenses"
                        ? month.actualExpenses - Math.abs(parseFloat(action.payload.amount))
                        : month.actualExpenses; 
    
                const goalMet = newActualIncome + newActualExpenses >= month.goal; 
    
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
            transactions: [...state.transactions, newTransaction],
            monthlyTracking: updatedTracking,
        };
    }
    case "DELETE_TRANSACTION": {
      const transactionToDelete = state.transactions.find(
          (transaction) => transaction.id === action.payload
      );
  
      const updatedMonthlyTracking = state.monthlyTracking.map((month) => {
          if (month.month === transactionToDelete.month) {
              let newActualIncome = month.actualIncome;
              let newActualExpenses = month.actualExpenses;
  
              if (transactionToDelete.type === "income") {
                  newActualIncome -= parseFloat(transactionToDelete.amount); // Subtract income
              } else if (transactionToDelete.type === "expenses") {
                  newActualExpenses += Math.abs(parseFloat(transactionToDelete.amount)); // Add back the expense
              }
  
              const goalMet = newActualIncome + newActualExpenses >= month.goal;
  
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
          transactions: state.transactions.filter(
              (transaction) => transaction.id !== action.payload
          ),
          monthlyTracking: updatedMonthlyTracking,
      };
  }

  case "EDIT_TRANSACTION": {
    const transactionToEdit = state.transactions.find(
        (transaction) => transaction.id === action.payload.id
    );

    const amountDifference = parseFloat(action.payload.transaction.amount) - parseFloat(transactionToEdit.amount);

    const updatedMonthlyTracking = state.monthlyTracking.map((month) => {
        if (month.month === transactionToEdit.month) {
            let newActualIncome = month.actualIncome;
            let newActualExpenses = month.actualExpenses;

            if (transactionToEdit.type === "income") {
                newActualIncome -= parseFloat(transactionToEdit.amount); 
                newActualIncome += parseFloat(action.payload.transaction.amount);
            } else if (transactionToEdit.type === "expenses") {
                newActualExpenses += Math.abs(parseFloat(transactionToEdit.amount)); 
                newActualExpenses -= Math.abs(parseFloat(action.payload.transaction.amount)); 
            }

            const goalMet = newActualIncome + newActualExpenses >= month.goal;

            return {
                ...month,
                actualIncome: newActualIncome,
                actualExpenses: newActualExpenses,
                goalMet,
            };
        }
        return month;
    });

    const updatedTransactions = state.transactions.map(transaction =>
        transaction.id === action.payload.id
            ? { ...transaction, ...action.payload.transaction }
            : transaction
    );

    return {
        ...state,
        transactions: updatedTransactions,
        monthlyTracking: updatedMonthlyTracking,
    };
}
  default:
    return state;
  }  
}

const BudgetProvider = ({ children }) => {
  const { user } = useAuth(); 
  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const [displayedTransaction, setDisplayedTransaction] = useState(state.transactions);
  

  useEffect(() => {
    if (!user) return; 

    const fetchBudgetData = async () => {
      try {
       const response = await axios.get(`http://localhost:4000/budget/${user.id}`, { withCredentials: true });
        dispatch({ type: "SET_BUDGET_DATA", payload: response.data });
       
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    };

    fetchBudgetData();
  }, [user]); // Run effect when user changes


  return (
    <BudgetContext.Provider value={{ state, dispatch, displayedTransaction, setDisplayedTransaction }}>
      {children}
    </BudgetContext.Provider>
  );
};

export { BudgetContext, BudgetProvider };