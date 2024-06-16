import React, { useContext, useState } from "react";
import { BudgetContext } from "../context/Context";

function Budget() {
  const { transactionState, displayedTransaction, setDisplayedTransaction } =
    useContext(BudgetContext);

  const [expensesBudget, setExpensesBudget] = useState("");
  const [incomeBudget, setIncomeBudget] = useState("");
//submit handlers
  const incomeBudgetHandler = (e) => {
    setIncomeBudget(e.target.value);
  };
  const expensesBudgetHandler = (e) => {
    setExpensesBudget(-Math.abs(e.target.value));
  };
//functions
  const totalAmount = transactionState.reduce((acc, trans) => {
    return (acc += parseFloat(trans.transaction.amount));
  }, 0).toFixed(2);
  const totalIncome = transactionState.reduce((acc, trans) => {
    if (trans.transaction.type === "income") {
      return (acc += parseFloat(trans.transaction.amount));
    }
    return acc;
  }, 0).toFixed(2);

  const totalExpense = transactionState.reduce((acc, trans) => {
    if (trans.transaction.type === "expenses") {
      return (acc += parseFloat(trans.transaction.amount));
    }
    return acc;
  }, 0).toFixed(2);

  const savingGoal=(incomeBudget-Math.abs(expensesBudget)).toFixed(2)
  const difference = (savingGoal-totalAmount).toFixed(2);
  
  return (
    <div className="info-container">
      <div className="actual-container">
       
        <div className="total-container">
          <p>Total income</p>
          <h3>€ {totalIncome}</h3>
        </div>
        <div className="total-container">
          <p>Total expenses</p>
          <h3>€{totalExpense}</h3>
        </div>
        <div className="total-container">
          <p>Total balance</p>
          <h3>€ {totalAmount}</h3>
        </div>
      </div>

      <div className="budget-container">
        <div className="total-container">
          <p>Your income budget</p>
           <h3>€ {parseFloat(incomeBudget||0).toFixed(2)}</h3>
          <form>
            <input
              className="budget"
              type="number"
              placeholder="Set your budget here..."
              value={incomeBudget}
              onChange={incomeBudgetHandler}
              required
            />
          </form>
        </div>
        <div className="total-container">
          <p>Your expenses budget</p>
          <h3>€{parseFloat(expensesBudget||0).toFixed(2)}</h3>
          <form>
            <input
              className="budget"
              type="number"
              placeholder="Set your budget here..."
              value={expensesBudget}
              onChange={expensesBudgetHandler}
              required
            />
          </form>
        </div>
        <div  className={`total-container ${difference<1? "positive": "negative"}`}>
          <p>Saving goal</p>
          <h3>€ {savingGoal}</h3>
          <p>{difference < 1 ? "Positive balance" : difference > 1 ? "Negative balance" : "Neutral balance"}</p>
          <h3>€ {difference}</h3>
        </div>
      </div>
    </div>
  );
}

export default Budget;
