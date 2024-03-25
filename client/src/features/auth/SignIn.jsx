import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectError,
  selectIsLoading,
  selectStatus,
  selectUser,
} from "./authSlice";
import OAuth from "../../components/OAuth";

export default function SignIn() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const loading = useSelector(selectIsLoading);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  // Since React may batch state updates, we use useEffect to ensure we have the latest
  // 'status' value after the component re-renders due to the state change.
  // useEffect guarantees that the code within it runs after the component has re-rendered in
  // response to the state update, ensuring that we access the latest 'status' for navigation.
  
  useEffect(() => {
    if (status == "success" && user) {
      navigate("/");
    }
  }, [navigate, status]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(login(formData));
    console.log("rendere3d");
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
