import { useContext, useState, useEffect } from "react";
import { BudgetContext } from "../context/Context.jsx";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { formatDate } from "../utils/formatDate.js";

function TransactionForm() {
  const {user}=useAuth();
  const { dispatch, state } = useContext(BudgetContext);
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const handleTransactionType = (e) => {
    setTransactionType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "Add new expense" && e.target.value !== "Add new income") {
      setCustomCategory("");
    }
  };

  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;
    // If expenses are chosen then make the value negative
    if (transactionType === "expenses") {
      value = -Math.abs(value);
    }
    setAmount(value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    const updateBackend = async () => {
     
  
      try {
        const userId = user._id;
  
        // Format transactions again just before sending
        const formattedTransactions = state.transactions.map(transaction => ({
          ...transaction,
          date: formatDate(transaction.date) // Ensure date is in the correct format
        }));
  
        const budgetData = {
          budgetGoal: state.budgetGoal,
          monthlyTracking: state.monthlyTracking,
          transactions: formattedTransactions,
        };
  
        // Log the formatted budgetData
        console.log("Budget data being sent:", budgetData);
  
        const response = await axios.put(
          `http://localhost:4000/budget/${userId}`,
          budgetData,
          { withCredentials: true }
        );
        
        console.log("Updated budget data:", response.data);
      } catch (error) {
        console.error("Error updating budget data:", error);
      }
    };
  
    updateBackend();
  }, [state.transactions, state.monthlyTracking]);
  
  const submitHandler = async (e) => {
    e.preventDefault();

    const finalCategory =
      category === "Add new expense" || category === "Add new income"
        ? customCategory
        : category;

    // Format the date using the formatDate function
    const formattedDate = formatDate(date);

    const newTransaction = {
      type: transactionType,
      category: finalCategory,
      date: formattedDate, // Use the formatted date here
      amount: parseFloat(amount).toFixed(2),
      month: new Date(formattedDate).toLocaleString('default', { month: 'long' }), // Get the month from the formatted date
    };

    // Dispatch the new transaction to update state
    dispatch({
      type: "ADD_TRANSACTION",
      payload: newTransaction,
    });
    console.log("New transaction:", newTransaction);

    // Clear form inputs
    setTransactionType("");
    setCategory("");
    setAmount("");
    setCustomCategory("");
  };

  const categories =
    transactionType === "expenses"
      ? [
          "Rent",
          "Utilities",
          "Groceries",
          "Insurance",
          "Car/Transport",
          "Phone",
          "Internet",
          "Memberships/Subscriptions",
          "Eating Out",
          "Clothes",
          "Hair/Personal Care",
          "Credit Card",
          "Loan",
          "Entertainment",
          "Gifts",
          "Add new expense",
        ]
      : ["Salary", "Investment", "Side Business", "Add new income"];

      return (
        <div className="border-2 border-gray-700 bg-gray-900 sm:p-6 lg:p-8 max-w-screen-xl mx-auto min-w-96 text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-white">
              Start logging your transactions
            </h1>
            <p className="mt-4 text-gray-400">
              Stay on top of your finances effortlessly.
            </p>
          </div>
      
          <form
            onSubmit={submitHandler}
            action="#"
            className="mx-auto mb-0 mt-8 max-w-md space-y-4 "
          >
            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
              <div>
                <label
                  className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-800 p-3 text-gray-300 hover:border-green-500 hover:bg-gray-700 has-[:checked]:border-green-500 has-[:checked]:bg-green-600 has-[:checked]:text-white"
                  tabIndex="0"
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="transactionType"
                    id="transactionType"
                    tabIndex="-1"
                    value="income"
                    checked={transactionType === "income"}
                    onChange={handleTransactionType}
                    required
                  />
                  <span className="text-sm"> Income</span>
                </label>
              </div>
      
              <div>
                <label
                  className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-gray-800 p-3 text-gray-300 hover:border-red-500 hover:bg-gray-700 has-[:checked]:border-red-500 has-[:checked]:bg-red-600 has-[:checked]:text-white"
                  tabIndex="0"
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="transactionType"
                    id="transactionType"
                    tabIndex="-1"
                    value="expenses"
                    checked={transactionType === "expenses"}
                    onChange={handleTransactionType}
                    required
                  />
                  <span className="text-sm"> Expense</span>
                </label>
              </div>
            </div>
      
            <div>
              <label
                htmlFor="categories"
                className="block text-sm font-medium text-gray-300"
              >
                Categories
              </label>
      
              <select
                className="mt-1.5 p-3 w-full rounded-lg border border-gray-600 bg-gray-800 text-gray-300 sm:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                name="categories"
                id="categories"
                onChange={handleCategoryChange}
                required
              >
                <option value="">Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
      
            {(category === "Add new expense" || category === "Add new income") && (
              <div className="form-group">
                <label htmlFor="customCategory" className="text-gray-300"></label>
                <input
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 p-4 text-sm text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  type="text"
                  id="customCategory"
                  placeholder="Enter new category"
                  value={customCategory}
                  onChange={handleCustomCategoryChange}
                  required
                />
              </div>
            )}
      
            <div>
              <label htmlFor="date" className="sr-only">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="date"
                  placeholder="YYYY-MM-DD"
                  value={date}
                  onChange={handleDateChange}
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 p-4 text-sm text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
      
            <div>
              <label htmlFor="amount" className="sr-only">
                Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="amount"
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 p-4 text-sm text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Amount"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                />
              </div>
            </div>
      
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="inline-block rounded-lg bg-green-600 border-2 border-green-500 px-5 py-3 text-sm font-medium text-white w-36 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      );
      
}

export default TransactionForm;
