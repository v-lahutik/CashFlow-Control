import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function Register() {
  const [user, setUser] = useState({ fullName: "", email: "", password: "" });
  const [errors, setErrors] = useState({}); 

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        url: "http://localhost:5000/users/register",
        method: "POST",
        data: user,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data); 
    } catch (error) {
      if (error.response) {
        setErrors({ ...errors, res: error.response.data.errors[0].msg });
        console.log(error.response.data.errors[0].msg);
      } else {
        console.log("An unexpected error occurred:", error.message); 
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
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={submitHandler}>
          <div>
              <div className="flex items-center justify-between">
                <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
                  Full name
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="fullName"
                  type="fullName"
                  required
                  autoComplete="fullName"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={changeHandler}
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
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

         
        </div>
      </div>
    </>
  )
}

export default Register