import React, { useContext} from "react";
import { BudgetContext } from "../context/Context";

function Budget() {
  const { state, dispatch } = useContext(BudgetContext);

//submit handlers
  const incomeBudgetHandler = (e) => {
      dispatch({type: "UPDATE_INCOME_BUDGET", payload: parseFloat(e.target.value)})
  };
  const expensesBudgetHandler = (e) => {
    dispatch({type: "UPDATE_EXPENSES_BUDGET", payload: parseFloat(e.target.value)})
  };
//functions
console.log("state", state)
  const totalAmount = state.transactions.reduce((acc, trans) => {
    return (acc += parseFloat(trans.transaction.amount));
  }, 0).toFixed(2);
  const totalIncome = state.transactions.reduce((acc, trans) => {
    if (trans.transaction.type === "income") {
      return (acc += parseFloat(trans.transaction.amount));
    }
    return acc;
  }, 0).toFixed(2);

  const totalExpense = state.transactions.reduce((acc, trans) => {
    if (trans.transaction.type === "expenses") {
      return (acc += parseFloat(trans.transaction.amount));
    }
    return acc;
  }, 0).toFixed(2);

  const savingGoal=(state.incomeBudget-Math.abs(state.expensesBudget)).toFixed(2)
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
           <h3>€ {parseFloat(state.incomeBudget||0).toFixed(2)}</h3>
          <form>
            <input
              className="budget"
              type="number"
              placeholder="Set your budget here..."
              value={state.incomeBudget}
              onChange={incomeBudgetHandler}
              required
            />
          </form>
        </div>
        <div className="total-container">
          <p>Your expenses budget</p>
          <h3>€{parseFloat(state.expensesBudget||0).toFixed(2)}</h3>
          <form>
            <input
              className="budget"
              type="number"
              placeholder="Set your budget here..."
              value={state.expensesBudget}
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
