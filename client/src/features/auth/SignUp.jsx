import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signup,
  selectError,
  selectIsLoading,
  selectStatus,
  selectUser,
} from "./authSlice";
import OAuth from "../../components/OAuth";

export default function SignUp() {
  const [formEntries, setFormEntries] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  const navigate = useNavigate();

  // Since React may batch state updates, we use useEffect to ensure we have the latest
  // 'status' value after the component re-renders due to the state change.
  // useEffect guarantees that the code within it runs after the component has re-rendered in
  // response to the state update, ensuring that we access the latest 'status' for navigation.
  useEffect(() => {
    if (status == "success") {
      navigate("/sign-in");
    }
  }, [navigate, status]);

  // console.log(formEntries);
  const inputChangeHandler = (event) => {
    setFormEntries({
      ...formEntries,
      [event.target.name]: event.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    await dispatch(signup(formEntries));
    console.log("rendere3d");
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
        <OAuth />
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
