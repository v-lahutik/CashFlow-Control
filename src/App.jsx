 import './App.css'
import './index.css'
import Layout from './assets/components/Layout'
import { BudgetProvider} from './assets/context/Context'


function App() {
  // useEffect(()=>{
  //   return ()=>{
  //     localStorage.clear()
  //   }
  // })
  return (
    <>
    {/* <h1 className="text-3xl font-bold ">
    Empower Your Finances: Your Budget, Your Future!
  </h1> */}
    <BudgetProvider>
     <Layout />
   </BudgetProvider></>
  )
}

export default App
