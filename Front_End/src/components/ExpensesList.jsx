import { useContext, useState, useEffect } from "react";
import { BudgetContext } from "../context/Context.jsx";
import { BsTrash, BsPencil } from "react-icons/bs";
import { PiChartLineUp, PiChartLineDown } from "react-icons/pi";

function ExpensesList({ display, toggleView }) {
  const { state, dispatch, displayedTransaction, setDisplayedTransaction } = useContext(BudgetContext);

  const [filterOption, setFilterOption] = useState("all");
  const [monthFilter, setMonthFilter] = useState(""); // New state for month filtering
  const [amountFilter, setAmountFilter] = useState({ min: "", max: "" }); // New state for amount filtering
  const [editMode, setEditMode] = useState(null);
  const [editFormData, setEditFormData] = useState({
    date: "",
    type: "",
    category: "",
    amount: "",
  });

  const deleteHandler = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const editHandler = (transaction) => {
    setEditMode(transaction.id);
    setEditFormData({ ...transaction.transaction });
  };

  const saveEditHandler = (id) => {
    dispatch({ type: "EDIT_TRANSACTION", payload: { id, transaction: editFormData } });
    setEditMode(null);
  };

  useEffect(() => {
    let filteredTransactions = state.transactions;

    // Apply type filter (all, income, expenses)
    if (filterOption !== "all") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.transaction.type === filterOption
      );
    }

    // Apply month filter
    if (monthFilter) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionMonth = new Date(transaction.transaction.date).getMonth() + 1; // Months are 0-based in JavaScript
        return transactionMonth === parseInt(monthFilter);
      });
    }

    // Apply amount filter
    if (amountFilter.min || amountFilter.max) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const amount = parseFloat(transaction.transaction.amount);
        return (
          (amountFilter.min === "" || amount >= parseFloat(amountFilter.min)) &&
          (amountFilter.max === "" || amount <= parseFloat(amountFilter.max))
        );
      });
    }

    setDisplayedTransaction(filteredTransactions);
  }, [filterOption, monthFilter, amountFilter, state.transactions]);

  return (
    <>
      <div className="bg-white rounded-s p-4 ring ring-indigo-50 w-full max-w-screen-xl mx-auto">
        <button onClick={toggleView}>
          <strong className="rounded border border-green-300 bg-green-300 px-3 py-1.5 text-[12px] font-medium text-grey-500">
            {display === "budget" ? "Table View" : "Overview"}
          </strong>
        </button>
        <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Transaction List</h2>
          <p className="mt-4 text-gray-500 m-7">Select the buttons below to filter your results.</p>
        </div>

        <form className="mb-4">
          <div className="flex justify-around items-center text-center gap-3">
            <label className="block w-4/12 cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                className="sr-only"
                name="transactionType"
                id="all"
                value="all"
                checked={filterOption === "all"}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <span className="text-sm">All</span>
            </label>
            <label className="block w-4/12 cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                className="sr-only"
                name="transactionType"
                id="income"
                value="income"
                checked={filterOption === "income"}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <span className="text-sm">Income</span>
            </label>
            <label className="block w-4/12 cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                className="sr-only"
                name="transactionType"
                id="expenses"
                value="expenses"
                checked={filterOption === "expenses"}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <span className="text-sm">Expenses</span>
            </label>
          </div>

          {/* Month Filter */}
          <div className="flex justify-around items-center text-center gap-3 mt-4">
            <label className="block w-6/12">
              <span className="text-gray-600">Filter by Month</span>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="block w-full mt-1 border rounded-lg p-2"
              >
                <option value="">All Months</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </label>
          </div>

          {/* Amount Filter */}
          <div className="flex justify-around items-center text-center gap-3 mt-4">
            <label className="block w-6/12">
              <span className="text-gray-600">Min Amount</span>
              <input
                type="number"
                value={amountFilter.min}
                onChange={(e) => setAmountFilter({ ...amountFilter, min: e.target.value })}
                className="block w-full mt-1 border rounded-lg p-2"
                placeholder="Min amount"
              />
            </label>
            <label className="block w-6/12">
              <span className="text-gray-600">Max Amount</span>
              <input
                type="number"
                value={amountFilter.max}
                onChange={(e) => setAmountFilter({ ...amountFilter, max: e.target.value })}
                className="block w-full mt-1 border rounded-lg p-2"
                placeholder="Max amount"
              />
            </label>
          </div>
        </form>

        <div className="overflow-x-auto">
          {displayedTransaction.length === 0 ? (
            <div className="text-center p-4 text-gray-500">
              <p>No transactions available.</p>
              <p>Add a new transaction to get started.</p>
            </div>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gradient-to-r from-green-300 to-blue-300">
                <tr>
                  <th className="text-left px-4 py-2 border-b">Date</th>
                  <th className="text-left px-4 py-2 border-b">Type</th>
                  <th className="text-left px-4 py-2 border-b">Category</th>
                  <th className="text-left px-4 py-2 border-b">Amount</th>
                  <th className="text-left px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedTransaction.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    {editMode === transaction.id ? (
                      <>
                        <td className="px-4 py-2">
                          <input
                            type="date"
                            value={editFormData.date}
                            onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <select
                            value={editFormData.type}
                            onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                            className="border rounded px-2 py-1"
                          >
                            <option value="income">Income</option>
                            <option value="expenses">Expenses</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={editFormData.category}
                            onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            value={editFormData.amount}
                            onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button onClick={() => saveEditHandler(transaction.id)}>Save</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">{transaction.transaction.date}</td>
                        <td className="px-4 py-2 flex items-center">
                          {transaction.transaction.type === "income" && (
                            <PiChartLineUp className="ml-2 m-3 text-green-600" />
                          )}
                          {transaction.transaction.type === "expenses" && (
                            <PiChartLineDown className="ml-2 m-3 text-red-600" />
                          )}
                          {transaction.transaction.type}
                        </td>
                        <td className="px-4 py-2">{transaction.transaction.category}</td>
                        <td className="px-4 py-2">{transaction.transaction.amount}</td>
                        <td className="px-4 py-2 flex gap-2">
                          <button onClick={() => editHandler(transaction)}>
                            <BsPencil />
                          </button>
                          <button onClick={() => deleteHandler(transaction.id)}>
                            <BsTrash />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default ExpensesList;
