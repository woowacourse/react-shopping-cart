import styles from "./title-box-head.module";

function TitleBoxHead({ children }) {
  return <div className={styles.head}>{children}</div>;
}

export default TitleBoxHead;
