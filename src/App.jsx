import "./App.css";
import Logon from "./features/Logon";
import Header from "./shared/Header";
import TodosPage from "./features/Todos/TodosPage";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Header />
      {isAuthenticated ? <TodosPage /> : <Logon />}
    </div>
  );
}

export default App;
