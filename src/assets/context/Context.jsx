import {createContext, useReducer, useState} from 'react'
import {v4 as uuidv4} from 'uuid';


// Function to save state to local storage
const saveToLocalStorage = (state) => {
    localStorage.setItem('state', JSON.stringify(state));
  };

// Initialize state from local storage
const getInitialTransactions = () => {
    const savedState = localStorage.getItem('state');
    return savedState ? JSON.parse(savedState) :
        {transactions: [],
        incomeBudget: "",
        expensesBudget: ""};
  };

export const BudgetContext = createContext(null)


export const transactionReducer = (state, action)=>{

const {type, payload}=action

switch(type){
    case "ADD_TRANSACTION": {
        console.log("state", state);
        console.log("payload", payload);
        // Add new transaction and save to local storage
        const newState = {...state, transactions:[...state.transactions, {id: uuidv4(), transaction: payload}]};
        saveToLocalStorage(newState);
        return newState;
    }
        
    case "DELETE_TRANSACTION": {
        // Delete transaction and save updated state to local storage
        const newState = {...state, transactions: state.transactions.filter(
            (transaction) => transaction.id !== payload
        )}
        saveToLocalStorage(newState);
        return newState;
    }
     case "UPDATE_INCOME_BUDGET": {
        const newState= {...state, incomeBudget: payload}
        saveToLocalStorage(newState)
        return newState
        
     }
     case "UPDATE_EXPENSES_BUDGET": {
        const newState= {...state, expensesBudget: payload}
        saveToLocalStorage(newState)
        return newState
     }
    default:
        return state
}
}

export const BudgetProvider = ({ children }) => {
    // Initialize useReducer with state from local storage
    const [state, dispatch] = useReducer(
        transactionReducer,
        {transactions: [],
        incomeBudget: "",
        expensesBudget: ""},
        getInitialTransactions
    );
// Initialize state for displayed transactions
const [displayedTransaction, setDisplayedTransaction] = useState(state.transactions);

    return (
        <BudgetContext.Provider value={{ state, dispatch, displayedTransaction, setDisplayedTransaction }}>
            {children}
        </BudgetContext.Provider>
    );
};

