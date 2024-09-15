import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { BudgetContext } from '../context/Context.jsx'

function Register() {
  const {dispatch}=useContext(BudgetContext);
  const [user, setUser] = useState({ firstName: "",lastName: "", email: "", password: "" });
  const [errors, setErrors] = useState({}); 
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        url: "http://localhost:4000/users/register",
        method: "POST",
        data: user,
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // After successful registration, set user and budget state
      const { user: newUser, budget } = res.data;
  
      // Set user and budget data in your state or context
      dispatch({ type: "SET_USER", payload: newUser });
      dispatch({ type: "SET_BUDGET_DATA", payload: budget });
  
      // Reset the form
      setUser({ firstName: "", lastName: "", email: "", password: "" });
      setMessage(res.data.message);
      setErrors({});
    } catch (error) {
      console.error("Error during registration:", error);
  
      if (error.response) {
        // Check if error response data is valid
        const errorMessages = error.response.data.errors || [];
        setErrors({ ...errors, res: errorMessages });
        
        // Ensure there is at least one error message to access
        if (errorMessages.length > 0) {
          setMessage(errorMessages[0].msg); // Safely access the first error message
        } else {
          setMessage("An unexpected error occurred");
        }
      } else {
        setErrors({ ...errors, res: "An unexpected error occurred" });
        setMessage("Network error or unexpected response");
      }
    }
  };
  

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value }); 
  };
 
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={submitHandler}>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                  value={user.firstName}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                  Last name
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                  value={user.lastName}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                  value={user.email}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                  value={user.password}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

         
          {message && (
            <div className={`mt-4 p-4 ${errors.res ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded-md`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;