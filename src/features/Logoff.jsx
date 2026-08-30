import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Logoff() {
  const { logout } = useAuth();

  const [authError, setAuthError] = useState("");
  const [isLoggingOff, setIsLoggingOff] = useState(false);

  const handleLogout = async () => {
    setAuthError("");
    setIsLoggingOff(true);

    try {
      const result = await logout();

      if (!result.success) {
        setAuthError(result.error);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOff(false);
    }
  };

  return (
    <div>
      {authError && <p>{authError}</p>}
      <button type="button" onClick={handleLogout} disabled={isLoggingOff}>
        {isLoggingOff ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default Logoff;
