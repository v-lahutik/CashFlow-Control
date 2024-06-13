import { useContext, useEffect, useState } from "react";
import { BudgetContext } from "../context/Context";
import { BsTrash } from "react-icons/bs";

function ExpensesList() {
  const { transactionState, dispatch, displayedTransaction,setDisplayedTransaction } = useContext(BudgetContext);

  const deleteHandler = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };
  const [filterOption, setFilterOption] = useState("all");

  const checkboxFilterValue = {
    all: "all",
    expenses: "expenses",
    income: "income",
  };

useEffect(() => {
  if (filterOption === "all") {
    setDisplayedTransaction(transactionState);
  } else {
    const filteredTransaction = transactionState.filter((transaction) => 
      transaction.transaction.type === filterOption
    );
    setDisplayedTransaction(filteredTransaction);
  }
}, [filterOption, transactionState]);


console.log("displayed tr",displayedTransaction)
console.log("transaction State",transactionState)

  return (
    <div className="transaction-list">
      <h2>List</h2>
      <div className="filter">
        <form>
          <input
            type="checkbox"
            id="all"
            name="all"
            value={checkboxFilterValue.all}
            checked={filterOption===checkboxFilterValue.all}
            onChange={(e)=>setFilterOption(e.target.value)}
          />
          <label htmlFor="checkbox">All</label>
          <input
            type="checkbox"
            id="income"
            name="income"
            value={checkboxFilterValue.income}
            checked={filterOption===checkboxFilterValue.income}
            onChange={(e)=>setFilterOption(e.target.value)}
          />
          <label htmlFor="checkbox">Income</label>
          <input
            type="checkbox"
            id="Expenses"
            name="expenses"
            value={checkboxFilterValue.expenses}
            checked={filterOption===checkboxFilterValue.expenses}
            onChange={(e)=>setFilterOption(e.target.value)}
          />
          <label htmlFor="checkbox">Expenses</label>
        </form>
        
      </div>
      <ul>
        {displayedTransaction.map((transaction) => (
          <li
            className={`list-item ${transaction.transaction.type}`}
            key={transaction.id}
          >
            <span>{transaction.transaction.type}</span>
            <span>{transaction.transaction.category}</span>
            <span>{transaction.transaction.amount}</span>
            <span onClick={() => deleteHandler(transaction.id)}>
              <BsTrash />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpensesList;
