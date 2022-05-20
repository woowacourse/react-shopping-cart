import Divider from "../divider/Divider";
import styles from "./page-title.module";

function PageTitle({ children }) {
  return (
    <div className={styles.pageTitle}>
      <div className={styles.title}>{children}</div>
      <Divider />
    </div>
  );
}

export default PageTitle;
