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
    <>
   
    <div className="transaction-list">
      <h2>List</h2>
      <div>
        <form>
         <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            <label    
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
              <input
                  type="radio"
                  className="sr-only"
                  name="transactionType"
                  id="all"
                  tabIndex="-1"
                  value="all"
                  checked={filterOption === checkboxFilterValue.all}
                  onChange={(e) => setFilterOption(e.target.value)}
                />
                <span className="text-sm"> All</span></label>
                <label    
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
              <input
                  type="radio"
                  className="sr-only"
                  name="transactionType"
                  id="income"
                  tabIndex="-1"
                  value="income"
                  checked={filterOption === checkboxFilterValue.income}
                  onChange={(e) => setFilterOption(e.target.value)}
                />
                <span className="text-sm">Income</span></label>
                <label    
                className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
                tabIndex="0"
              >
              <input
                  type="radio"
                  className="sr-only"
                  name="transactionType"
                  id="expenses"
                  tabIndex="-1"
                  value="expenses"
                  checked={filterOption === checkboxFilterValue.expenses}
                  onChange={(e) => setFilterOption(e.target.value)}
                />
                <span className="text-sm"> Expenses</span></label>
            
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
    </div> </>
  );
}

export default ExpensesList;
