import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

import styles from "./Logoff.module.css";

function Logoff() {
  const { logout } = useAuth();

  const [authError, setAuthError] = useState("");
  const [isLoggingOff, setIsLoggingOff] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setAuthError("");
    setIsLoggingOff(true);

    try {
      const result = await logout();

      if (result.success) {
        navigate("/login");
      } else {
        setAuthError(result.error);
      }
    } catch (error) {
      setAuthError("Unable to log out. Please try again.");
    } finally {
      setIsLoggingOff(false);
    }
  };

  return (
    <div className={styles.container}>
      {authError && (
        <p className={styles.error} role="alert">
          {authError}
        </p>
      )}

      <button
        type="button"
        onClick={handleLogout}
        disabled={isLoggingOff}
        className={styles.button}
      >
        {isLoggingOff ? "Logging out..." : "Log Out"}
      </button>
    </div>
  );
}

export default Logoff;
