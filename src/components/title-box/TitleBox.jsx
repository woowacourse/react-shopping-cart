import TitleBoxHead from "./TitleBoxHead";
import TitleBoxContent from "./TitleBoxContent";

import styles from "./title-box.module";

function TitleBox({ children }) {
  return <div className={styles.box}>{children}</div>;
}

Object.assign(TitleBox, {
  Head: TitleBoxHead,
  Content: TitleBoxContent,
});

export default TitleBox;
