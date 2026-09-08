// import { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router";
// import { useAuth } from "../contexts/AuthContext";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [authError, setAuthError] = useState("");
//   const [isLoggingOn, setIsLoggingOn] = useState(false);
//   const { login, isAuthenticated } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get intended destination from location state, default to /todos
//   const from = location.state?.from?.pathname || "/todos";

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate(from, { replace: true });
//     }
//   }, [isAuthenticated, navigate, from]);

//   // Handle login form submission
//   async function handleSubmit(e) {
//     e.preventDefault();
//     setAuthError("");
//     setIsLoggingOn(true);
//     // ... existing login logic

//     try {
//       const result = await login(email, password);

//       if (result.success) {
//         // useEffect will handle redirect
//       } else if (!result.success) setAuthError(result.error);
//     } catch (error) {
//       setAuthError(`Error: ${error.name} | ${error.message}`);
//     } finally {
//       setIsLoggingOn(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       {authError && <p>{authError}</p>}
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           value={email}
//           required
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           value={password}
//           required
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button type="submit" disabled={isLoggingOn}>
//         {isLoggingOn ? "Loading..." : "Login"}
//       </button>
//     </form>
//   );
// }

// export default LoginPage;

import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  // Get the page the user originally wanted to visit
  const from = location.state?.from?.pathname || "/todos";

  async function handleSubmit(e) {
    e.preventDefault();

    setAuthError("");
    setIsLoggingOn(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        setAuthError(result.error);
        return;
      }

      // Login succeeded, go to the original destination
      navigate(from, { replace: true });
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  }

  return (
    <div>
      <h2>Login</h2>

      {authError && <p>{authError}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
