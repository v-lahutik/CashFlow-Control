import "./index.css";
import { BudgetProvider } from "./assets/context/Context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./assets/components/Register";
import Layout from "./assets/components/Layout";
import Login from "./assets/components/Login";
import Header from "./assets/components/Header";
import Home from "./assets/components/Home";

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
