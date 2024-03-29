import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectUser } from "../features/auth/authSlice";

export default function PrivateRoute() {
  const user = useSelector(selectUser);
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
}
