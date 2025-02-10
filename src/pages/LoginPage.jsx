import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch users from API
  useEffect(() => {
    axios
      .get("https://flowerstore-api-json-server.onrender.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
        setErrorMessage("Failed to fetch users. Please try again later.");
      });
  }, []);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const user = users.find((user) => user.email === email);

    if (user) {
      if (user.password === password) {
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to the Account Page
        navigate("/account");
      } else {
        setErrorMessage("Password entered is incorrect");
      }
    } else {
      setErrorMessage("User not found");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Login
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmail}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePassword}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
          </form>
        )}

        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}

        <p className="text-center text-gray-600 mt-4">
          Don't have an account yet?
        </p>
        <Link
          to="/signup"
          className="text-blue-600 hover:underline text-center block mt-2"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate} from "react-router-dom";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState(undefined);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Fetch users from API
//   useEffect(() => {
//     const API_URL = import.meta.env.VITE_API_URL;
//     axios.get(`${API_URL}/users`)
//       .then((response) => {
//         setUsers(response.data);
//         setLoading(false);  // Set loading to false after data is fetched
//       })
//       .catch(err => {
//         console.error("Error fetching users:", err);
//         setLoading(false);
//         setErrorMessage("Failed to fetch users. Please try again later.");
//       });
//   }, []);

//   const handleEmail = (e) => setEmail(e.target.value);
//   const handlePassword = (e) => setPassword(e.target.value);

//   const handleLoginSubmit = (e) => {
//     e.preventDefault();

//     const user = users.find(user => user.email === email);

//     if (user) {
//       if (user.password === password) {
//         // Logic to handle successful login can go here later
//         console.log("Login successful");
//         navigate("/account");
//       } else {
//         setErrorMessage("Password entered is incorrect");
//       }
//     } else {
//       setErrorMessage("User not found");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h1>

//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>  // Show loading text
//         ) : (
//           <form onSubmit={handleLoginSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//               <input 
//                 type="email"
//                 name="email"
//                 id="email"
//                 value={email}
//                 onChange={handleEmail}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//               <input 
//                 type="password"
//                 name="password"
//                 id="password"
//                 value={password}
//                 onChange={handlePassword}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>

//             <button 
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Login
//             </button>
//           </form>
//         )}

//         {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}

//         <p className="text-center text-gray-600 mt-4">Don't have an account yet?</p>
//         <Link to="/signup" className="text-blue-600 hover:underline text-center block mt-2">Sign Up</Link>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
