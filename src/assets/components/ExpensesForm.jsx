import { useContext, useState } from "react";
import { BudgetContext } from "../context/Context";
import { v4 as uuidv4 } from "uuid";

function ExpensesForm() {
  const { dispatch } = useContext(BudgetContext);
  const [transactionType, setTransactionType] = useState("");
  const [category, setCategory] = useState();
  const [amount, setAmount] = useState("");
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
        amount: parseFloat(amount),
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
    <div className="form-container">
      <h1>Expense Tracker</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
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
        <div className="form-group">
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
        {(category === "Add new expense" || category==="Add new income") && (
          <div className="form-group">
            <input
              type="text"
              placeholder="enter new category"
              value={customCategory}
              onChange={handleCustomCategoryChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
            required
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default ExpensesForm;
