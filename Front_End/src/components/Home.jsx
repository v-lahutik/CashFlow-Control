import React from 'react'
import Budget from './BudgetDisplay.jsx'
import ExpensesForm from './ExpensesForm.jsx'
import ExpensesList from './ExpensesList.jsx'
import SavingTips from './SavingTips.jsx'
import Charts from './Charts.jsx'


function Home() {
  return (
    <div className="main-container bg-gray-100  p-2 sm:p-4 lg:p-6">
    <div className="top-container flex flex-col sm:flex-row gap-4">
          <ExpensesForm />
          <Budget />
        </div>
        <div className="bottom-container flex flex-col sm:flex-row gap-4 mt-8">
          <ExpensesList />
          <div className="right-container flex flex-col gap-4">
            <SavingTips />
            <Charts />
          </div>
        </div>
      </div>
  )
}

export default Home