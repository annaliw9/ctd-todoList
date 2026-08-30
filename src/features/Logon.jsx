import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingOn(true);

    try {
      const result = await login(email, password);
      if (!result.success) setAuthError(result.error);
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {authError && <p>{authError}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" disabled={isLoggingOn}>
        {isLoggingOn ? "Loading..." : "Login"}
      </button>
    </form>
  );
}

export default Logon;
