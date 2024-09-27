import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users/me", {
          withCredentials: true, // This ensures cookies are sent with the request
        });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        // You may want to handle errors here (e.g., token invalid or expired)
      }
    };

    checkUserSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:4000/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
