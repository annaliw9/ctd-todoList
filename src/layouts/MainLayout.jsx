import { Outlet } from "react-router";
import Header from "../shared/Header";
import styles from "./MainLayout.module.css";

function MainLayout() {
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <p>© 2026 Todo App</p>
      </footer>
    </div>
  );
}

export default MainLayout;
