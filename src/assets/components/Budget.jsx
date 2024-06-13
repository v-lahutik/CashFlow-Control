import React, { useContext, useState } from 'react'
import { BudgetContext } from '../context/Context'
import { Chart } from 'primereact/chart';

function Budget() {
  const[budget, setBudget]=useState("")
  const budgetHandler=(e)=>{
    setBudget(e.target.value)
  }
    const {transactionState, displayedTransaction, setDisplayedTransaction}=useContext(BudgetContext)
    
    const totalAmount=displayedTransaction.reduce((acc,trans)=>{
      acc+=parseFloat(trans.transaction.amount)
      return acc
    },0)
    

  return (
    <div className='budget-container'>
      <p>Total amount</p>
      <p>€ {totalAmount}</p>
        <form>
            <label htmlFor="">Your budget</label>
            <input
            type="number"
            placeholder="Amount"
            value={budget}
            onChange={budgetHandler}
            required
          />
        </form>
        <div className='budget'>€{budget}</div>
    </div>
  )
}

export default Budget