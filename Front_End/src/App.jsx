import "./index.css";
import { BudgetProvider } from "./context/Context.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Charts from "./components/Charts";

function App() {
  return (
    <BudgetProvider>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/overview" element={<Charts />} />
        </Routes>
      </Router>
    </BudgetProvider>
  );
}

export default App;
