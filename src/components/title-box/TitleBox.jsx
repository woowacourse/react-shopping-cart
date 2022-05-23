import TitleBoxHead from "./TitleBoxHead";
import TitleBoxContent from "./TitleBoxContent";

import styles from "./title-box.module";

const cn = require("classnames");

function TitleBox({ children, className }) {
  return <div className={cn(styles.box, className)}>{children}</div>;
}

Object.assign(TitleBox, {
  Head: TitleBoxHead,
  Content: TitleBoxContent,
});

export default TitleBox;
