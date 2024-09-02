import React from 'react'
import Budget from './BudgetDisplay.jsx'
import ExpensesForm from './ExpensesForm.jsx'
import { useState } from 'react'

import Table from './Table.jsx'



function Home() {
  const [display, setDisplay] = useState("budget");

  const toggleView = () => {
    setDisplay((prev) => (prev === "budget" ? "table" : "budget"));
  };

  return (
    <div className="main-container bg-gray-100 p-2 sm:p-4 lg:p-6">
      <div className="top-container flex flex-col sm:flex-row gap-4">
        <ExpensesForm />
        <Budget />
      </div>
     <Table/>
    </div>
  );
}

export default Home;