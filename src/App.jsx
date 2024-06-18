import "./App.css";
import "./index.css";
import Layout from "./assets/components/Layout";
import { BudgetProvider } from "./assets/context/Context";

function App() {
  // useEffect(()=>{
  //   return ()=>{
  //     localStorage.clear()
  //   }
  // })
  return (
    <>
    
      <BudgetProvider>
        <Layout />
      </BudgetProvider>
    </>
  );
}

export default App;
