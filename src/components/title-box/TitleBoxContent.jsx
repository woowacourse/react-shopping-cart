import styles from "./title-box-content.module";

function TitleBoxContent({ children }) {
  return <div className={styles.content}>{children}</div>;
}

export default TitleBoxContent;
