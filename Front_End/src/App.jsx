import "./index.css";
import { BudgetProvider } from "./context/Context.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Layout from "./components/Layout.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";

function App() {
  return (
    <BudgetProvider>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </BudgetProvider>
  );
}

export default App;
