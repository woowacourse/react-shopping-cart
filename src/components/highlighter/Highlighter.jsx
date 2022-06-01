import cn from "classnames";
import styles from "./highlighter.module";

function Highlighter({ children }) {
  return (
    <div className={cn(styles.highlighter)}>
      {children}
      <span />
    </div>
  );
}

export default Highlighter;
