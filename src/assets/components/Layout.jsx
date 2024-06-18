import ExpensesForm from "./ExpensesForm";
import Charts from "./Chart";
import ExpensesList from "./ExpensesList";
import Budget from "./Budget";
import Header from "./Header";
import SavingTips from "./SavingTips";

function Layout() {
  return (
    <>
    <Header />
      <div className="main-container">
        <div className="top-container">
          <ExpensesForm />
          <Budget />
        </div>
        <div className="bottom-container">
          <ExpensesList />
          <div className="right-container">
            <SavingTips />
            <Charts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
