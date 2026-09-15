import styles from "./AboutPage.module.css";

function AboutPage() {
  return (
    <div className={styles.about}>
      <h1 className={styles.title}>About Todo App</h1>

      <p className={styles.description}>
        This Todo App helps you organize your daily tasks, keep track of
        completed work, and stay productive.
      </p>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Features</h2>

          <ul className={styles.list}>
            <li>Add new tasks</li>
            <li>Mark tasks as completed</li>
            <li>Edit and delete tasks</li>
            <li>Filter and organize your tasks</li>
            <li>Navigate between different pages</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Technologies Used</h2>

          <ul className={styles.list}>
            <li>React</li>
            <li>React Router</li>
            <li>Vite</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AboutPage;
