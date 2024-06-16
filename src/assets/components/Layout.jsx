
import ExpensesForm from './ExpensesForm'
import Charts from './Chart'
import ExpensesList from './ExpensesList'
import Budget from './Budget'


function Layout() {
  return (
    <>
    
    <div className='main-container'>
    <div className='top-container'>
    <ExpensesForm />
    <Budget />
    </div>
    
    <ExpensesList />
    
    <Charts />
    </div>
    </>
  )
}

export default Layout