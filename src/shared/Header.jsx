import { useAuth } from "../contexts/AuthContext";
import Logoff from "../features/Logoff";

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <h1>Todo App {isAuthenticated && <Logoff />}</h1>
    </header>
  );
}

export default Header;
