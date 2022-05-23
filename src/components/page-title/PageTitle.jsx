import Divider from "../divider/Divider";
import styles from "./page-title.module";

const cn = require("classnames");

function PageTitle({ children, className }) {
  return (
    <div className={cn(styles.pageTitle, className)}>
      <div className={styles.title}>{children}</div>
      <Divider />
    </div>
  );
}

export default PageTitle;
