import ExpensesForm from "./ExpensesForm";
import Charts from "./Chart";
import ExpensesList from "./ExpensesList";
import Budget from "./Budget";
import SavingTips from "./SavingTips";

function Layout() {
  return (
    <>
      <div className="main-container">
        <div className="top-container">
          <ExpensesForm />
          <Budget />
        </div>
        <div className="bottom-container">
         
          <ExpensesList />
          <Charts />
           <SavingTips />
          
          
        </div>
      </div>
    </>
  );
}

export default Layout;
