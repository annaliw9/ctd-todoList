function AboutPage() {
  return (
    <div className="about">
      <h1>About Todo App</h1>
      <p>
        This Todo App helps you organize your daily tasks, keep track of
        completed work, and stay productive.
      </p>
      <section>
        <h2>Features</h2>
        <ul>
          <li>Add new tasks</li>
          <li>Mark tasks as completed</li>
          <li>Edit and delete tasks</li>
          <li>Filter and organize your tasks</li>
          <li>Navigate between different pages</li>
        </ul>
      </section>

      <section>
        <h2>Technologies Used</h2>
        <ul>
          <li>React</li>
          <li>React Router</li>
          <li>Vite</li>
        </ul>
      </section>
    </div>
  );
}

export default AboutPage;
