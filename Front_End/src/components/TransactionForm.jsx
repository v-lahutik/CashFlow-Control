import { useContext, useState } from "react";
import { BudgetContext } from "../context/Context.jsx";


function TransactionForm() {
  const { dispatch } = useContext(BudgetContext);
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

  const submitHandler = (e) => {
    e.preventDefault();
    const finalCategory =
      category === "Add new expense" || category === "Add new income"
        ? customCategory
        : category;
        dispatch({
          type: "ADD_TRANSACTION",
          payload: {
            type: transactionType, 
            category: finalCategory, 
            date: date, 
            amount: parseFloat(amount).toFixed(2), 
            month: new Date(date).toLocaleString('default', { month: 'long' }), 
          },
        });
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
    <div className="bg-white rounded-lg p-4 ring ring-indigo-50 sm:p-6 lg:p-8 max-w-screen-xl mx-auto min-w-96 ">
      <div className="text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Start logging your transactions
        </h1>
        <p className="mt-4 text-gray-500">
          Stay on top of your finances effortlessly.
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        action="#"
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          <div>
            <label
              className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
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
              className="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white"
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
              <span className="text-sm">Expense</span>
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-900"
          >
            {" "}
            Categories{" "}
          </label>

          <select
            className="mt-1.5 p-3 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm "
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
            <label htmlFor="customCategory"></label>
            <input
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              type="text"
              id="customCategory"
              placeholder="enter new category"
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
              value={date}
              onChange={handleDateChange}
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
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
              className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
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
            className="inline-block rounded-lg bg-green-300 border-2 border-blue-300 px-5 py-3 text-sm font-medium text-grey-500 w-36"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
