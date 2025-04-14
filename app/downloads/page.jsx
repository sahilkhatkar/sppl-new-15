import Download from "../../components/Download";
import styles from "./page.module.css";

export default async function Downloads() {
  return (
    <div className={styles.container}>
      <h1>Downloads</h1>

      <section className={styles.sessionDetails}>
        <div>
          <strong>Pending List </strong>
          <span>
            {/* <Download
              pendingListData={1}
              query={1}
              pdfHeading={1}
            /> */}
          </span>
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
