import "./index.css";
import React from "react";
import { BudgetProvider } from "./context/Context.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import BudgetChart from "./components/BudgetChart";
import Table from "./components/Table";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <BudgetProvider>
          <div className="flex flex-col min-h-screen ">
            <Header />
            <main className="flex-grow bg-gray-700">
              <Routes>
                <Route index element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/overview" element={<BudgetChart />} />
                <Route path="/table" element={<Table display="full" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BudgetProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
