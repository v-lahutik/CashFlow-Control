import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state to manage data fetch timing
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users/me", {
          withCredentials: true, // This sends the cookies with the request
        });
        if (response.data.user) {
          setUser(response.data.user); // Set the user if found
        } else {
          setUser(null); // No user found
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUser(null); // Clear user state on error
      } finally {
        setLoading(false); // Stop loading state
      }
    };
  
    checkUserSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    navigate("/");
    window.location.reload();
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
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
