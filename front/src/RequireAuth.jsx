import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isAuthed =
    token && token !== "null" && token !== "undefined" && token.trim() !== "";

  if (!isAuthed) {
    return <Navigate to="/entrygate" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
