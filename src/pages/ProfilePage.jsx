import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { email, token, isAuthenticated } = useAuth();

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

        const response = await fetch("/api/tasks", options);

        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        const todos = data.tasks;

        // Calculate statistics
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
    <div>
      <h1>Profile</h1>

      <section>
        <h2>User Information</h2>
        <p>
          <strong>Name:</strong> {email}
        </p>
      </section>
      <p>
        <strong>Status:</strong>
        {isAuthenticated ? "Authenticated" : "Not authenticated"}
      </p>

      <section>
        <h2>Todo Statistics</h2>

        {loading && <p>Loading statistics...</p>}

        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div>
            <div>
              <p>Total: {todoStats.total}</p>
            </div>

            <div>
              <p>Completed: {todoStats.completed}</p>
            </div>

            <div>
              <p>Active: {todoStats.active}</p>
            </div>
            {todoStats.total > 0 && (
              <p>
                <strong>Completion:</strong> {completionPercentage}%
              </p>
            )}
            {todoStats.total === 0 && <p>You don't have any todos yet.</p>}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
