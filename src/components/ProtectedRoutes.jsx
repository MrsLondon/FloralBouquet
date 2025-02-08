import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isPrivate }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  if (isPrivate && !isLoggedIn) {
    // If it's a private route and the user is not logged in
    return <Navigate to="/login" />;
  }

  if (!isPrivate && isLoggedIn) {
    // If it's an anonymous route and the user is logged in
    return <Navigate to="/" />;
  }

  // If the route is accessible, show the children (the component)
  return children;
}

export default ProtectedRoute;
