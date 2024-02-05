import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formEntries, setFormEntries] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();

  // console.log(formEntries);
  const inputChangeHandler = (event) => {
    setFormEntries({
      ...formEntries,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    console.log("submit");
    event.preventDefault();
    setIsLoading(true);
    // send it to backend
    try {
      const rawResponse = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formEntries),
      });
      const response = await rawResponse.json();

      setIsLoading(false);
      console.log(response);

      if (!response.success) {
        throw new Error(response.message);
      }
      navigate("/sign-in");
    } catch (error) {
      console.log("some error occurred");
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          name="userName"
          value={formEntries.userName}
          onChange={inputChangeHandler}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          name="email"
          value={formEntries.email}
          onChange={inputChangeHandler}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          name="password"
          value={formEntries.password}
          onChange={inputChangeHandler}
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "Sign up"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
