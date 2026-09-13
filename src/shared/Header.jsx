import { useAuth } from "../contexts/AuthContext";
import Logoff from "../features/Logoff";
import Navigation from "./Navigation";

function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header>
      <h1>Todo App</h1>
      <Navigation />
      {isAuthenticated && <Logoff />}
    </header>
  );
}

export default Header;
