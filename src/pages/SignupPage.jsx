import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password,
      name,
      address: {
        houseNumber,
        street,
        city,
        postalCode,
      },
    };

    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5005";

    axios
      .post(`${apiUrl}/users`, requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        setErrorMessage("Error occurred while signing up");
        console.log(error);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label>House Number:</label>
        <input type="text" name="houseNumber" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} />

        <label>Street:</label>
        <input type="text" name="street" value={street} onChange={(e) => setStreet(e.target.value)} />

        <label>City:</label>
        <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />

        <label>Postal Code:</label>
        <input type="text" name="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account?</p>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default SignupPage;