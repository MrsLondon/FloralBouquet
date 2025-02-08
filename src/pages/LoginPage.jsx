import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [users, setUsers] = useState([]);  // To store users fetched from the API

  const navigate = useNavigate();
  const { storeUserData, authenticateUser } = useContext(AuthContext);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5005';

    axios.get(`${apiUrl}/users`)
      .then(({ data }) => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const user = users.find(user => user.email === email);  // Find the user by email

    if (user) {
      if (user.password === password) {
        const userData = JSON.stringify({ email: user.email, name: user.name, id: user.id });
        storeUserData(userData);  // Store the user data in localStorage using the context
        authenticateUser();  // Update the authentication status
        navigate('/');  // Redirect to the home page
      } else {
        setErrorMessage("Password entered is incorrect");
      }
    } else {
      setErrorMessage("User not found");
    }
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}>Sign Up</Link>
    </div>
  );
}

export default LoginPage;
