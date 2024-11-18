import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Login() {
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { login } = useAuth();
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        url: `${API_BASE_URL}/users/login`,
        method: "POST",
        data: user,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      // Call the login function to update user state in AuthContext
      login({ id: res.data.user.id, email: user.email });

      setMessage(res.data.status);
      setErrors({});
      setUser({ email: "", password: "" });
    } catch (error) {
      if (error.response) {
        setErrors({ ...errors, res: error.response.data.error });
        setMessage(error.response.data.error);
      } else {
        setErrors({ ...errors, res: "An unexpected error occurred" });
        setMessage("An unexpected error occurred"); // Ensure message is set correctly
      }
    }
  };

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-300"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={changeHandler}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-300 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-300">
            Not a member?
            <Link
              to="/register"
              class="font-semibold leading-6 text-indigo-300 hover:text-indigo-700"
            >
              {" "}
              Register here
            </Link>
          </p>
          {message && (
            <div
              className={`mt-4 p-4 ${
                errors.res
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              } rounded-md`}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
