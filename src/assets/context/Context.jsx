import {createContext, useReducer, useState} from 'react'
import {v4 as uuidv4} from 'uuid';


// Function to save state to local storage
const saveToLocalStorage = (transactions) => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  };

// Initialize state from local storage
const getInitialTransactions = () => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  };

export const BudgetContext = createContext(null)

export const transactionReducer = (transactionState, action)=>{

const {type, payload}=action

switch(type){
    case "ADD_TRANSACTION": {
        console.log("state", transactionState);
        console.log("payload", payload);
        // Add new transaction and save to local storage
        const newTransactionState = [...transactionState, {id: uuidv4(), transaction: payload}];
        saveToLocalStorage(newTransactionState);
        return newTransactionState;
    }
        
    case "DELETE_TRANSACTION": {
        // Delete transaction and save updated state to local storage
        const updatedTransactionState = transactionState.filter(
            (transaction) => transaction.id !== payload
        );
        saveToLocalStorage(updatedTransactionState);
        return updatedTransactionState;
    }
        
    default:
        return transactionState
}
}

export const BudgetProvider = ({ children }) => {
    // Initialize useReducer with state from local storage
    const [transactionState, dispatch] = useReducer(
        transactionReducer,
        [],
        getInitialTransactions
    );
// Initialize state for displayed transactions
const [displayedTransaction, setDisplayedTransaction] = useState(transactionState);

    return (
        <BudgetContext.Provider value={{ transactionState, dispatch, displayedTransaction, setDisplayedTransaction }}>
            {children}
        </BudgetContext.Provider>
    );
};

