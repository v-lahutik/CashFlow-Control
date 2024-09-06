import React from 'react'
import { useState } from 'react'
import TransactionForm from './TransactionForm.jsx'
import Table from './Table.jsx'
import BudgetDisplay from './BudgetDisplay.jsx'



function Home() {
  const [display, setDisplay] = useState("budget");

  const toggleView = () => {
    setDisplay((prev) => (prev === "budget" ? "table" : "budget"));
  };

  return (
    <div className="main-container bg-gray-100 p-2 sm:p-4 lg:p-6">
      <div className="top-container flex flex-col sm:flex-row gap-4">
        <TransactionForm />
        <BudgetDisplay />
      </div>
     
    </div>
  );
}

export default Home;