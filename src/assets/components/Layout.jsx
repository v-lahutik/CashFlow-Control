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
    <div className="main-container p-4 sm:p-8 lg:p-12">
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
    </>
  );
}

export default Layout;
