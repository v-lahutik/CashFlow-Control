import './App.css'
import Layout from './assets/components/Layout'
import { BudgetProvider} from './assets/context/Context'
import { useEffect } from 'react'

function App() {
  // useEffect(()=>{
  //   return ()=>{
  //     localStorage.clear()
  //   }
  // })
  return (
    <BudgetProvider>
     <Layout />
   </BudgetProvider>
  )
}

export default App
