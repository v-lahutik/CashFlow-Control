import React from 'react'
import { useState } from 'react'
import TransactionForm from './TransactionForm.jsx'
import Table from './Table.jsx'
import BudgetDisplay from './BudgetDisplay.jsx'


function Home() {
  const [display, setDisplay] = useState("minimized")

  return (
      <div className="main-container bg-gray-100 flex flex-col sm:flex-row gap-2 sm:p-2 lg:p-2">
        <TransactionForm />
        <BudgetDisplay />
        <Table display={display} /> 
      </div>
    
  );
}
export default Home;