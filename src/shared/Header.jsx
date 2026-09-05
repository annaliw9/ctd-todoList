import { useAuth } from "../contexts/AuthContext";
import Logoff from "../features/Logoff";

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <h1>Todo App</h1>
      {isAuthenticated && <Logoff />}
    </header>
  );
}

export default Header;
