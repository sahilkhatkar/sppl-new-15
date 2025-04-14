import styles from "./page.module.css";

export default async function HelpAndInfo() {
  
  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>

      <section className={styles.sessionDetails}>
        <div>
          <strong>Version </strong>
          <span>1.1</span>
        </div>
        <div>
          <strong>About </strong>
          <span>This project is build using Next.js on top of React.js</span>
        </div>
        <div>
          <strong>Developed by </strong>
          <span>Sahil Kumar</span>
        </div>
      </section>
    </div>
  );
}
