import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Navigation.module.css";

function Navigation() {
  const { isAuthenticated } = useAuth();

  const navLinkStyle = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <nav className={styles.navigation}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
        </li>

        {isAuthenticated ? (
          <>
            <li className={styles.navItem}>
              <NavLink to="/todos" className={navLinkStyle}>
                Todos
              </NavLink>
            </li>

            <li className={styles.navItem}>
              <NavLink to="/profile" className={navLinkStyle}>
                Profile
              </NavLink>
            </li>
          </>
        ) : (
          <li className={styles.navItem}>
            <NavLink to="/login" className={navLinkStyle}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
