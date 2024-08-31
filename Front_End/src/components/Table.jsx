import { useContext, useState, useEffect } from "react";
import { BudgetContext } from "../context/Context.jsx";
import { BsTrash, BsPencil } from "react-icons/bs";
import { PiChartLineUp, PiChartLineDown } from "react-icons/pi";

function ExpensesList({ display, toggleView }) {
  const { state, dispatch, displayedTransaction, setDisplayedTransaction } =
    useContext(BudgetContext);

  const [filterOption, setFilterOption] = useState("all");
  const [monthFilter, setMonthFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");

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
        (transaction) => transaction.transaction.type === filterOption
      );
    }

    // Apply month filter
    if (monthFilter) {
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionMonth =
          new Date(transaction.transaction.date).getMonth() + 1;
        return transactionMonth === parseInt(monthFilter);
      });
    }

    if (sortOrder) {
      filteredTransactions = [...filteredTransactions].sort((a, b) => {
        const amountA = parseFloat(a.transaction.amount);
        const amountB = parseFloat(b.transaction.amount);
        return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
      });
    }

    setDisplayedTransaction(filteredTransactions);
  }, [filterOption, monthFilter, sortOrder, state.transactions]);

  return (
    <div className="bg-white rounded-s p-4 ring ring-indigo-50 w-full max-w-screen-xl mx-auto mt-6">
      <div className="p-4 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7">
        <div>
          <select
            className="w-full rounded-lg border-gray-300 p-2 text-gray-700"
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </select>
        </div>
        <div>
          <select
            className="w-full rounded-lg border-gray-300 p-2 text-gray-700"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
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
        </div>
        <div>
          <select
            className="w-full rounded-lg border-gray-300 p-2 text-gray-700"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="asc">Amount (Low to High)</option>
            <option value="desc">Amount (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
  {displayedTransaction.map((item) => {
    if (!item || !item.transaction) {
      return null; // If item or transaction is undefined, skip rendering this row
    }
    
    return (
      <tr
        key={item.id}
        className={`bg-white border-b ${
          item.transaction.type === "expenses"
            ? "bg-red-100"
            : "bg-green-100"
        }`}
      >
        <td className="px-6 py-4">
          {item.transaction.type === "income" ? (
            <PiChartLineUp className="text-green-500" />
          ) : (
            <PiChartLineDown className="text-red-500" />
          )}
        </td>
        <td className="px-6 py-4">
          {editMode === item.id ? (
            <input
              type="date"
              className="w-full rounded-lg border-gray-200 p-1 text-sm shadow-sm"
              value={editFormData.date}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  date: e.target.value,
                })
              }
            />
          ) : (
            item.transaction.date
          )}
        </td>
        <td className="px-6 py-4">
          {editMode === item.id ? (
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-1 text-sm shadow-sm"
              value={editFormData.category}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  category: e.target.value,
                })
              }
            />
          ) : (
            item.transaction.category
          )}
        </td>
        <td className="px-6 py-4">
          {editMode === item.id ? (
            <input
              type="number"
              className="w-full rounded-lg border-gray-200 p-1 text-sm shadow-sm"
              value={editFormData.amount}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  amount: e.target.value,
                })
              }
            />
          ) : (
            item.transaction.amount
          )}
        </td>
        <td className="px-6 py-4">
          {editMode === item.id ? (
            <button
              onClick={() => saveEditHandler(item.id)}
              className="text-blue-600"
            >
              Save
            </button>
          ) : (
            <>
              <BsPencil
                onClick={() => editHandler(item)}
                className="inline-block mr-2 cursor-pointer text-blue-600"
              />
              <BsTrash
                onClick={() => deleteHandler(item.id)}
                className="inline-block cursor-pointer text-red-600"
              />
            </>
          )}
        </td>
      </tr>
    );
  })}
</tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpensesList;
