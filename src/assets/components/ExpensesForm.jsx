import { useContext, useState } from "react";
import { BudgetContext } from "../context/Context";
import { v4 as uuidv4 } from "uuid";

function ExpensesForm() {
  const { dispatch } = useContext(BudgetContext);
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [customCategory, setCustomCategory] = useState("");

  const handleTransactionType = (e) => {
    setTransactionType(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if (e.target.value !== "Add new expense") {
      setCustomCategory("");
    }
  };
  const handleCustomCategoryChange = (e) => {
    setCustomCategory(e.target.value);
  };
  const handleAmountChange = (e) => {
    let value = e.target.value;
    //if expenses are chosen then make the value negative
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
      },
    });
    setTransactionType("");
    setCategory("");
    setAmount("");
    setCustomCategory("");
  };

  //conditional rendering depending on transaction type
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
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
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
            ><option value="">Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>   
          </div>
          {(category === "Add new expense" ||
            category === "Add new income") && (
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
              Email
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
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
      {/* OLD one */}

      {/* <div className="form-container">
        <h1>Expense Tracker</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="transactionType"></label>
            <select
              name="transactionType"
              id="transactionType"
              value={transactionType}
              onChange={handleTransactionType}
              required
            >
              <option value="">Transaction type</option>
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>
            </select>
          </div>
          <div className="mb-4">
           
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="transactionType"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={handleTransactionType}
                  required
                />
                <span className="ml-2">Income</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="transactionType"
                  value="expenses"
                  checked={transactionType === "expenses"}
                  onChange={handleTransactionType}
                  required
                />
                <span className="ml-2">Expenses</span>
              </label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="categories"></label>
            <select
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
          {(category === "Add new expense" ||
            category === "Add new income") && (
            <div className="form-group">
              <label htmlFor="customCategory"></label>
              <input
                type="text"
                id="customCategory"
                placeholder="enter new category"
                value={customCategory}
                onChange={handleCustomCategoryChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="date"></label>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount"></label>
            <input
              type="number"
              id="amount"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
              required
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div> */}
    </>
  );
}

export default ExpensesForm;
