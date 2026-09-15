import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const { name, token, isAuthenticated } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const options = {
          method: "GET",
          headers: { "X-CSRF-TOKEN": token },
          credentials: "include",
        };

        const response = await fetch("/api/tasks?limit=50", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const { tasks: todos } = await response.json();

        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setTodoStats({ total, completed, active });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  const completionPercentage =
    todoStats.total > 0
      ? Math.round((todoStats.completed / todoStats.total) * 100)
      : 0;

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
      </header>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>User Information</h2>

        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>

          <div>
            <p className={styles.name}>{name}</p>
            <span
              className={
                isAuthenticated
                  ? styles.statusAuthenticated
                  : styles.statusUnauthenticated
              }
            >
              {isAuthenticated ? "Authenticated" : "Not authenticated"}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Todo Statistics</h2>

        {loading && <p className={styles.message}>Loading statistics...</p>}

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className={styles.stats}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>Total</span>
                <span className={styles.statValue}>{todoStats.total}</span>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statLabel}>Completed</span>
                <span className={styles.statValue}>{todoStats.completed}</span>
              </div>

              <div className={styles.statCard}>
                <span className={styles.statLabel}>Active</span>
                <span className={styles.statValue}>{todoStats.active}</span>
              </div>
            </div>

            {todoStats.total > 0 ? (
              <div className={styles.completion}>
                <div className={styles.completionHeader}>
                  <strong>Completion</strong>
                  <span>{completionPercentage}%</span>
                </div>

                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className={styles.empty}>You don't have any todos yet.</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
