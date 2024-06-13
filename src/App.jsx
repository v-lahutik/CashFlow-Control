import './App.css'
import Layout from './assets/components/Layout'
import { BudgetProvider} from './assets/context/Context'

function App() {
  
  return (
    <BudgetProvider>
     <Layout />
   </BudgetProvider>
  )
}

export default App
