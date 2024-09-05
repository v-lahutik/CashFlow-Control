import { useContext, useState, useEffect } from "react";
import { BudgetContext } from "../context/Context.jsx";
import { BsTrash, BsPencil } from "react-icons/bs";
import { PiChartLineUp, PiChartLineDown } from "react-icons/pi";

function Table({ display, toggleView }) {
  const { state, dispatch, displayedTransaction, setDisplayedTransaction } =
    useContext(BudgetContext);

  const [filterOption, setFilterOption] = useState("all");
  const [monthFilter, setMonthFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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
    dispatch({
      type: "EDIT_TRANSACTION",
      payload: { id, transaction: editFormData },
    });
    setEditMode(null);
  };

  useEffect(() => {
    let filteredTransactions = state.transactions;

    // Apply type filter (all, income, expenses)
    if (filterOption !== "all") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.type === filterOption
      );
    }

    // Apply month filter
    if (monthFilter) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionMonth =
          new Date(transaction.date).getMonth() + 1; // Months are 0-based in JavaScript
        return transactionMonth === parseInt(monthFilter);
      });
    }

    if (sortOrder) {
      filteredTransactions = [...filteredTransactions].sort((a, b) => {
        const amountA = parseFloat(a.amount);
        const amountB = parseFloat(b.amount);
        return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
      });
    }

    setDisplayedTransaction(filteredTransactions);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [filterOption, monthFilter, sortOrder, state.transactions]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = displayedTransaction.slice(indexOfFirstItem, indexOfLastItem);
  console.log("displayed trans",displayedTransaction)
  console.log("displayed trans map",displayedTransaction.map(transaction => transaction))
  console.log("sate", state.transactions)
  const totalPages = Math.ceil(displayedTransaction.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="bg-white rounded-s p-4 ring ring-indigo-50 w-full max-w-screen-xl mx-auto">
        <div className="mx-auto max-w-lg text-center mt-4 m-10">
          <h2 className="text-2xl font-bold sm:text-3xl">Transaction List</h2>
        </div>

        <form className="mb-4">
          <div className="flex justify-between items-center gap-4">
            {/* Transaction Type Filter */}
            <label className="block w-full md:w-1/3">
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="block w-full mt-1 border rounded-lg p-2"
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expenses">Expenses</option>
              </select>
            </label>

            {/* Month Filter */}
            <label className="block w-full md:w-1/3">
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                className="block w-full mt-1 border rounded-lg p-2"
              >
                <option value="" disabled hidden>
                  Sort by Month
                </option>
                <option value="">All</option>
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

            {/* Amount Sorting */}
            <label className="block w-full md:w-1/3">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="block w-full mt-1 border rounded-lg p-2"
              >
                <option value="" disabled hidden>
                  Sort by Amount
                </option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
          </div>
        </form>

        <div className="overflow-x-auto">
          {currentTransactions.length === 0 ? (
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
              
                {currentTransactions.map((transaction) => (
                   <tr key={transaction.id } className="border-b">
                  
                    {editMode === transaction.id ? (
                      <>
                        <td className="px-4 py-2">
                          <input
                            type="date"
                            value={editFormData.date}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                date: e.target.value,
                              })
                            }
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <select
                            value={editFormData.type}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                type: e.target.value,
                              })
                            }
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
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                category: e.target.value,
                              })
                            }
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            value={editFormData.amount}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                amount: e.target.value,
                              })
                            }
                            className="border rounded px-2 py-1"
                          />
                        </td>
                        <td className="px-4 py-2 flex gap-2">
                          <button
                            onClick={() => saveEditHandler(transaction.id)}
                            className="text-green-600 hover:underline"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditMode(null)}
                            className="text-red-600 hover:underline"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-2">{transaction.date}</td>
                        <td className="px-4 py-2 flex items-center">
                          {transaction.type === "income" && (
                            <PiChartLineUp className="ml-2 m-3 text-green-600" />
                          )}
                          {transaction.type === "expenses" && (
                            <PiChartLineDown className="ml-2 m-3 text-red-600" />
                          )}
                          {transaction.type}
                        </td>
                        <td className="px-4 py-2">{transaction.category}</td>
                        <td className="px-4 py-2">{transaction.amount}</td>
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

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Table;
