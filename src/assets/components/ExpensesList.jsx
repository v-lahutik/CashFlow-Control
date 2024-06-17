import { useContext, useEffect, useState } from "react";
import { BudgetContext } from "../context/Context";
import { BsTrash } from "react-icons/bs";

function ExpensesList() {
  const {
    state,
    dispatch,
    displayedTransaction,
    setDisplayedTransaction,
  } = useContext(BudgetContext);

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
      setDisplayedTransaction(state.transactions);
    } else {
      const filteredTransaction = state.transactions.filter(
        (transaction) => transaction.transaction.type === filterOption
      );
      setDisplayedTransaction(filteredTransaction);
    }
  }, [filterOption, state.transactions]);

  console.log("displayed tr", displayedTransaction);
  console.log("transaction State", state);

  return (
    <div className="transaction-list">
      <h2>List</h2>
      <div className="filter">
        <form>
          <div className="filter-form-group">
            <label htmlFor="all">All</label>
            <input
              type="checkbox"
              id="all"
              name="all"
              value={checkboxFilterValue.all}
              checked={filterOption === checkboxFilterValue.all}
              onChange={(e) => setFilterOption(e.target.value)}
            />
          </div>
          <div className="filter-form-group">
            <label htmlFor="income">Income</label>
            <input
              type="checkbox"
              id="income"
              name="income"
              value={checkboxFilterValue.income}
              checked={filterOption === checkboxFilterValue.income}
              onChange={(e) => setFilterOption(e.target.value)}
            />
          </div>
          <div className="filter-form-group">
            <label htmlFor="expenses">Expenses</label>
            <input
              type="checkbox"
              id="expenses"
              name="expenses"
              value={checkboxFilterValue.expenses}
              checked={filterOption === checkboxFilterValue.expenses}
              onChange={(e) => setFilterOption(e.target.value)}
            />
          </div>
        </form>
      </div>
      <ul>
        {displayedTransaction.map((transaction) => (
          <li
            className={`list-item ${transaction.transaction.type}`}
            key={transaction.id}
          >
            <span>{transaction.transaction.date}</span>
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
