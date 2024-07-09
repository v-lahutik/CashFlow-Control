import { useContext, useEffect, useState } from "react";
import { BudgetContext } from "../context/Context";
import { BsTrash, BsPencil  } from "react-icons/bs";
import { PiChartLineUp, PiChartLineDown} from "react-icons/pi";

function ExpensesList() {
  const {
    state,
    dispatch,
    displayedTransaction,
    setDisplayedTransaction,
  } = useContext(BudgetContext);

  const deleteHandler = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };
  // const editHandler= ()=>{
  //   e.preventDefault()
  //   dispatch({type: "EDIT_TRANSACTION", payload: })
  // }
  const [filterOption, setFilterOption] = useState("all");

  const checkboxFilterValue = {
    all: "all",
    expenses: "expenses",
    income: "income",
  };

  useEffect(() => {
    if (filterOption === "all") {
      setDisplayedTransaction(state.transactions);
    } else {
      const filteredTransaction = state.transactions.filter(
        (transaction) => transaction.transaction.type === filterOption
      );
      setDisplayedTransaction(filteredTransaction);
    }
  }, [filterOption, state.transactions]);

 

  return (
    <>
      <div className=" p-4 w-6/12 min-h-36 rounded-s bg-white p-4 ring ring-indigo-50">
      <div className="mx-auto max-w-lg text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Transaction List
          </h2>
          <p className="mt-4 text-gray-500 m-7">
          Select the buttons below to filter your results.
          </p>
        </div>
        
        <form className="mb-4">
           <div className="flex justify-around items-center text-center gap-3">
            <label className="block w-4/12 cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                className="sr-only"
                name="transactionType"
                id="all"
                value="all"
                checked={filterOption === checkboxFilterValue.all}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <span className="text-sm">All</span>
            </label>
            <label className="block w-4/12 cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                className="sr-only"
                name="transactionType"
                id="income"
                value="income"
                checked={filterOption === checkboxFilterValue.income}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <span className="text-sm">Income</span>
            </label>
            <label className="block w-4/12 cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-black has-[:checked]:bg-black has-[:checked]:text-white">
              <input
                type="radio"
                className="sr-only"
                name="transactionType"
                id="expenses"
                value="expenses"
                checked={filterOption === checkboxFilterValue.expenses}
                onChange={(e) => setFilterOption(e.target.value)}
              />
              <span className="text-sm">Expenses</span>
            </label>
          </div>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gradient-to-r from-green-300 to-blue-300">
              <tr>
                <th className="text-left px-4 py-2 border-b">Date</th>
                <th className="text-left px-4 py-2 border-b">Type</th>
                <th className="text-left px-4 py-2 border-b">Category</th>
                <th className="text-left px-4 py-2 border-b">Amount</th>
                <th className="text-left px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedTransaction.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-4 py-2">{transaction.transaction.date}</td>
                  <td className="px-4 py-2 flex items-center">
                    
                    {transaction.transaction.type === "income" && (
                      <PiChartLineUp className="ml-2 m-3 text-green-600" />
                    )}
                    {transaction.transaction.type === "expenses" && (
                      <PiChartLineDown className="ml-2 m-3 text-red-600" />
                    )}
                    {transaction.transaction.type}
                  </td>
                  
                  <td className="px-4 py-2">{transaction.transaction.category}</td>
                  <td className="px-4 py-2">{transaction.transaction.amount}</td>
                  <td className="px-4 py-2">
                    <button onClick={() => deleteHandler(transaction.id)}
                    ><BsTrash />
                    </button>
                    {/* <button onClick={()=>editHandler(transaction.id)}><BsPencil /></button> */}
                  </td>                      
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ExpensesList;