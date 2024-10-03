import React, { createContext, useReducer, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid'; // Install uuid library

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
           
     
        };
    console.log("newTransaction context ", newTransaction)
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
      // Find the transaction to delete before filtering it out
      const transactionToDelete = state.transactions.find(
        (transaction) => transaction._id === action.payload
      );
    
      // Filter out the deleted transaction
      const updatedTransactions = state.transactions.filter(
        (transaction) => transaction._id !== action.payload
      );
    
      // If no transaction was found, return the current state
      if (!transactionToDelete) return state;
    
      // Update the monthly tracking based on the deleted transaction
      const updatedMonthlyTracking = state.monthlyTracking.map((month) => {
        if (month.month === transactionToDelete.month) {
          let newActualIncome = month.actualIncome;
          let newActualExpenses = month.actualExpenses;
    
          // Reverse the effects of the deleted transaction
          if (transactionToDelete.type === "income") {
            newActualIncome -= parseFloat(transactionToDelete.amount);
          } else if (transactionToDelete.type === "expenses") {
            newActualExpenses -= Math.abs(parseFloat(transactionToDelete.amount));
          }
    
          // Recalculate whether the goal was met after the deletion
          const goalMet = newActualIncome - newActualExpenses >= month.goal;
    
          return {
            ...month,
            actualIncome: newActualIncome,
            actualExpenses: newActualExpenses,
            goalMet,
            id: month._id
          };
        }
    
        return month;
      });
    
      return {
        ...state,
        transactions: updatedTransactions,
        monthlyTracking: updatedMonthlyTracking,
      };
    }
    

  case "EDIT_TRANSACTION": {
    console.log("edit transaction context", action.payload)
    const transactionToEdit = state.transactions.find(
        (transaction) => transaction._id === action.payload.id
    );

    if (!transactionToEdit) return state;

    const updatedTransactions = state.transactions.map(transaction =>
        transaction._id === action.payload.id
            ? { ...transaction, ...action.payload.transaction }
            : transaction
    );

    const amountDifference = parseFloat(action.payload.transaction.amount) - parseFloat(transactionToEdit.amount);

    const updatedMonthlyTracking = state.monthlyTracking.map((month) => {

      console.log("month. month", month.month)
            console.log("tra edit ", transactionToEdit)

        if (month.month === transactionToEdit.month) {
               
            
            let newActualIncome = month.actualIncome;
            let newActualExpenses = month.actualExpenses;
       

            if (transactionToEdit.type === "income") {
                newActualIncome -= parseFloat(transactionToEdit.amount);
                newActualIncome += parseFloat(action.payload.transaction.amount);
                console.log("amount",action.payload.transaction.amount)

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
    const fetchBudgetData = async () => {
      if (!user || !user._id) return; // Wait until the complete user data is available
      console.log("user from budget context", user)
      console.log("user ID from budget context", user._id)
      try {
        const response = await axios.get(`http://localhost:4000/budget/${user._id}`, {
          withCredentials: true,
          
        });
        dispatch({ type: "SET_BUDGET_DATA", payload: response.data });
        console.log("response from budget context", response.data)
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    };

    fetchBudgetData();
  }, [user]); // Only run when the complete user object is available

  

  return (
    <BudgetContext.Provider value={{ state, dispatch, displayedTransaction, setDisplayedTransaction }}>
      {children}
    </BudgetContext.Provider>
  );
};

export { BudgetContext, BudgetProvider };