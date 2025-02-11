import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;


  if ( isLoggedIn) {
    // If it's an anonymous route and the user is logged in
    return <Navigate to="/" />;
  }

  // If the route is accessible, show the children (the component)
  return children;
}

export default ProtectedRoute;
