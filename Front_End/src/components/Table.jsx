import { useContext, useState, useEffect } from "react";
import { BudgetContext } from "../context/Context.jsx";
import { BsTrash, BsPencil } from "react-icons/bs";
import { PiChartLineUp, PiChartLineDown } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { useAuth } from "../context/AuthContext.jsx";
import { formatDate } from "../utils/formatDate.js";

function Table({ display }) {
  const { state, dispatch, displayedTransaction, setDisplayedTransaction } =
    useContext(BudgetContext);
  const { user } = useAuth();

  const navigate = useNavigate();
  const [filterOption, setFilterOption] = useState("all");
  const [monthFilter, setMonthFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [editMode, setEditMode] = useState(null);
  const [editFormData, setEditFormData] = useState({
    date: "",
    type: "",
    category: "",
    amount: "",
    id: "",
  });

  // When clicking on edit, populate form with transaction data
  const editHandler = (transaction) => {
    setEditMode(transaction.transactionId); // Activates edit mode for this transaction
    setEditFormData({
      date: transaction.date,
      type: transaction.type,
      category: transaction.category,
      amount: transaction.amount,
      id: transaction.transactionId, //id from reducer
    });
  };

  // Handles saving the edited transaction
  const saveEditHandler = (id) => {

    // Convert amount to a number if it's a string
    const parsedAmount = parseFloat(editFormData.amount);
    if (isNaN(parsedAmount)) {
      console.error("Invalid amount value:", editFormData.amount);
      return; // Stop execution if the amount is not a valid number
    }

    // Update the form data with the correct number type for amount
    const updatedTransaction = {
      ...editFormData,
      amount: parsedAmount,
      date: new Date(editFormData.date).toISOString(),
    };

    dispatch({
      type: "EDIT_TRANSACTION",
      payload: { id, transaction: updatedTransaction },
    });

    setEditMode(null);
    setEditFormData({});
  };

  // Handles both the frontend and backend delete process
  const deleteHandler = (transactionId) => {
    // Dispatch to update state first
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: transactionId,
    });


  };

  useEffect(() => {
    let filteredTransactions = state.transactions;

    if (filterOption !== "all") {
      filteredTransactions = filteredTransactions.filter(
        (transaction) => transaction.type === filterOption
      );
    }

    if (monthFilter) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionMonth = new Date(transaction.date).getMonth() + 1; // Months are 0-based in JavaScript
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
  const currentTransactions = displayedTransaction.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(displayedTransaction.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {display === "minimized" ? (
        <>
          <div className="border-2 border-gray-700 p-4 sm:p-6 lg:p-8 w-full bg-gray-900">
            <span className="flex justify-center mt-2 pb-2 relative">
              <h2 className="text-center text-2xl font-bold mb-4 py-6 text-white">
                Transaction List
              </h2>
              <button
                className="px-4 py-1.5 text-white rounded-md relative group "
                onClick={() => navigate("/table")}
              >
                <GoArrowRight className="mb-3" />
                <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-700 text-white text-md w-full rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 m-4">
                  View Full Table
                </span>
              </button>
            </span>

            {currentTransactions.length === 0 ? (
              <div className="text-center p-4 text-gray-400">
                <p>No transactions available.</p>
                <p>Add a new transaction to get started.</p>
              </div>
            ) : (
              <table className="min-w-full bg-gray-800 border border-gray-700">
                <thead className="bg-gradient-to-r from-green-500 to-blue-500">
                  <tr>
                    <th className="text-left px-4 py-2 border-b text-white">
                      Date
                    </th>
                    <th className="text-left px-4 py-2 border-b text-white">
                      Category
                    </th>
                    <th className="text-left px-4 py-2 border-b text-white">
                      Amount
                    </th>
                    <th className="text-left px-4 py-2 border-b text-white">
                      Edit
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentTransactions.map((transaction) => (
                    <tr
                      key={transaction.transactionId}
                      className="border-b border-gray-700"
                    >
                      {editMode === transaction.transactionId ? (
                        <>
                         <td className="px-4 py-2">
                            <input
                              type="text"
                              required
                              value={formatDate(editFormData.date)}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  date: e.target.value,
                                })
                              }
                              className="max-w-28 border rounded px-2 py-1 bg-gray-700 text-white"
                            />
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
                              className="max-w-28 border rounded px-2 py-1 bg-gray-700 text-white"
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
                              className=" max-w-16 border rounded px-2 py-1 bg-gray-700 text-white"
                            />
                          </td>
                          <td className="px-4 py-2 flex gap-2">
                            <button
                              onClick={() =>
                                saveEditHandler(transaction.transactionId)
                              }
                              className="text-green-400 hover:underline"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditMode(null)}
                              className="text-red-400 hover:underline"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                        <td className="px-4 py-2 text-white">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-4 py-2 flex items-center text-white">
                            {transaction.type === "income" && (
                              <span className="ml-2 text-green-300">{transaction.category}</span>
                            )}
                            {transaction.type === "expenses" && (
                              <span className="ml-2 text-red-400">{transaction.category}</span>
                            )}
                            
                          </td>
                          <td className="px-4 py-2 text-white">
                            {transaction.amount}
                          </td>
                          <td className="px-4 py-2 flex gap-2">
                            <button onClick={() => editHandler(transaction)}>
                              <BsPencil className="text-white" />
                            </button>
                            <button
                              onClick={() =>
                                deleteHandler(transaction.transactionId)
                              }
                            >
                              <BsTrash className="text-white" />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4 text-white">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-700 rounded-md"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-700 rounded-md"
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        // full table
        <div className="my-8 mx-auto max-w-screen-lg p-4 bg-gray-900 shadow-lg rounded-lg">
          <div className="mx-auto max-w-lg text-center mt-4 m-10">
            <h2 className="text-2xl font-bold sm:text-3xl text-white">
              Transaction List
            </h2>
          </div>

          <form className="mb-4">
            <div className="flex justify-between items-center gap-4">
              {/* Transaction Type Filter */}
              <label className="block w-full md:w-1/3">
                <select
                  value={filterOption}
                  onChange={(e) => setFilterOption(e.target.value)}
                  className="block w-full mt-1 border rounded-lg p-2 bg-gray-700 text-white"
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
                  className="block w-full mt-1 border rounded-lg p-2 bg-gray-700 text-white"
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
                  className="block w-full mt-1 border rounded-lg p-2 bg-gray-700 text-white"
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
              <div className="text-center p-4 text-gray-400">
                <p>No transactions available.</p>
                <p>Add a new transaction to get started.</p>
              </div>
            ) : (
              <table className="min-w-full bg-gray-800 border border-gray-700">
                <thead className="bg-gradient-to-r from-green-500 to-blue-500">
                  <tr>
                    <th className="text-left px-4 py-2 border-b text-white">
                      Date
                    </th>
                    <th className="text-left px-6 py-2 border-b text-white">
                      Type
                    </th>
                    <th className="text-left px-4 py-2 border-b text-white">
                      Category
                    </th>
                    <th className="text-left px-4 py-2 border-b text-white">
                      Amount
                    </th>
                    <th className="text-left px-4 py-2 border-b text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((transaction) => (
                    <tr
                      key={transaction.transactionId}
                      className="border-b border-gray-700"
                    >
                      {editMode === transaction.transactionId ? (
                        <>
                          <td className="px-4 py-2">
                            <input
                              type="date"
                              required
                              value={formatDate(editFormData.date)}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  date: e.target.value,
                                })
                              }
                              className="border rounded px-2 py-1 bg-gray-700 text-white"
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
                              className="max-w-32 border rounded px-2 py-1 bg-gray-700 text-white"
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
                              className="max-w-32 border rounded px-2 py-1 bg-gray-700 text-white"
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
                              className="max-w-32 border rounded px-2 py-1 bg-gray-700 text-white"
                            />
                          </td>
                          <td className="px-4 py-2 flex gap-2">
                            <button
                              onClick={() =>
                                saveEditHandler(transaction.transactionId)
                              }
                              className="text-green-400 hover:underline"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditMode(null)}
                              className="text-red-400 hover:underline"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-2 text-white">
                            {formatDate(transaction.date)}
                          </td>
                          <td className="px-4 py-2 flex items-center text-white">
                            {transaction.type === "income" && (
                              <PiChartLineUp className="m-2 text-green-400" />
                            )}
                            {transaction.type === "expenses" && (
                              <PiChartLineDown className="m-2 text-red-400" />
                            )}
                            <span className="ml-2">{transaction.type}</span>
                          </td>
                          <td className="px-4 py-2 text-white">
                            {transaction.category}
                          </td>
                          <td className="px-4 py-2 text-white">
                            {transaction.amount}
                          </td>
                          <td className="px-4 py-2 flex gap-2">
                            <button onClick={() => editHandler(transaction)}>
                              <BsPencil className="text-white" />
                            </button>
                            <button
                              onClick={() =>
                                deleteHandler(transaction.transactionId)
                              }
                            >
                              <BsTrash className="text-white" />
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
          <div className="flex justify-between items-center mt-4 text-white">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 rounded-md"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Table;
