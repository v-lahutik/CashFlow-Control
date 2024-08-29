import React from 'react'
import Budget from './BudgetDisplay.jsx'
import ExpensesForm from './ExpensesForm.jsx'
import ExpensesList from './ExpensesList.jsx'
import { useState } from 'react'

function Home() {
  const [display, setDisplay] = useState("budget");

  const toggleView = () => {
    setDisplay((prev) => (prev === "budget" ? "table" : "budget"));
  };

  return (
    <div className="main-container bg-gray-100 p-2 sm:p-4 lg:p-6">
      <div className="top-container flex flex-col sm:flex-row gap-4">
        <ExpensesForm />
        {display === "budget" ? (
          <Budget display={display} toggleView={toggleView} />
        ) : (
          <ExpensesList display={display} toggleView={toggleView} />
        )}
      </div>
    </div>
  );
}

export default Home;