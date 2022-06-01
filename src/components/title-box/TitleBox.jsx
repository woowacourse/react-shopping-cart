import cn from "classnames";
import TitleBoxHead from "./TitleBoxHead";
import TitleBoxContent from "./TitleBoxContent";

import styles from "./title-box.module";

function TitleBox({ children, className }) {
  return <div className={cn(styles.box, className)}>{children}</div>;
}

Object.assign(TitleBox, {
  Head: TitleBoxHead,
  Content: TitleBoxContent,
});

export default TitleBox;
