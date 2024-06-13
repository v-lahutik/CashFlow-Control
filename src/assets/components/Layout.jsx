
import ExpensesForm from './ExpensesForm'
import Charts from './Chart'
import ExpensesList from './ExpensesList'
import Budget from './Budget'


function Layout() {
  return (
    <>
    <Budget />
    <div className='main-container'>
    <ExpensesList />
    <ExpensesForm />
    <Charts />
    </div>
    </>
  )
}

export default Layout