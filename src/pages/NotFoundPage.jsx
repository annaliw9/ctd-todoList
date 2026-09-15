import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <p className={styles.code}>404</p>

        <h2 className={styles.title}>Page Not Found</h2>

        <p className={styles.message}>
          Sorry, the page you are looking for does not exist.
        </p>

        <nav className={styles.navigation} aria-label="Page navigation">
          <ul className={styles.navList}>
            <li>
              <Link className={styles.link} to="/">
                Home
              </Link>
            </li>

            <li>
              <Link className={styles.link} to="/about">
                About
              </Link>
            </li>

            <li>
              <Link className={styles.link} to="/todos">
                Todos
              </Link>
            </li>

            <li>
              <Link className={styles.link} to="/profile">
                Profile
              </Link>
            </li>

            <li>
              <Link className={styles.link} to="/login">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default NotFoundPage;
