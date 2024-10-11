import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { BudgetContext } from '../context/Context.jsx'

function Register() {
  
  const [user, setUser] = useState({ firstName: "",lastName: "", email: "", password: "" });
  const [errors, setErrors] = useState({}); 
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Validate firstName
    if (!user.firstName) {
      validationErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(user.firstName)) {
      validationErrors.firstName = "First name must contain only letters";
    } else if (user.firstName.length < 3 || user.firstName.length > 50) {
      validationErrors.firstName = "First name must be between 3 and 50 characters";
    }
  
    // Validate lastName
    if (!user.lastName) {
      validationErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(user.lastName)) {
      validationErrors.lastName = "Last name must contain only letters";
    } else if (user.lastName.length < 3 || user.lastName.length > 100) {
      validationErrors.lastName = "Last name must be between 3 and 100 characters";
    }
  
    // Validate email
    if (!user.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      validationErrors.email = "Please enter a valid email address";
    }
  
    // Validate password
    if (!user.password) {
      validationErrors.password = "Password is required";
    } else if (user.password.length < 5) {
      validationErrors.password = "Password must be at least 5 characters long";
    } else if (!/\d/.test(user.password)) {
      validationErrors.password = "Password must contain at least one number";
    } else if (!/[A-Z]/.test(user.password)) {
      validationErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(user.password)) {
      validationErrors.password = "Password must contain at least one special character";
    }
  
    // If there are validation errors, update the errors state and return early
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios({
        url: "http://localhost:4000/users/register",
        method: "POST",
        data: user,
        headers: {
          "Content-Type": "application/json",
        }
      });
      setMessage(res.data.message);
      setErrors({});
      setUser({ firstName: "", lastName: "", email: "", password: "" });
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data)
        console.error("FIRST ERROR:", error.response.data.errors[0].msg)
        console.log("Errors state:", errors);
        setErrors({ ...errors, res: error.response.data.errors });
        setMessage(error.response.data.errors[0].msg);
      } else {
        console.error("Unexpected error:", error.message); 
        setErrors({ ...errors, res: "An unexpected error occurred" });
        setMessage(error.response.data.errors[0].msg);
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
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={submitHandler}>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-300">
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
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                  value={user.firstName}
                />
                {errors.firstName && <p className="py-2 text-red-500 text-xs">{errors.firstName}</p>} 
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-300">
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
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                  value={user.lastName}
                />
                 {errors.lastName && <p className="py-2 text-red-500 text-xs">{errors.lastName}</p>} 
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                  value={user.email}
                />
                {errors.email&& <p className="py-2 text-red-500 text-xs">{errors.email}</p>} 
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">
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
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                  value={user.password}
                />
                {errors.password&& <p className="py-2 text-red-500 text-xs">{errors.password}</p>} 
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