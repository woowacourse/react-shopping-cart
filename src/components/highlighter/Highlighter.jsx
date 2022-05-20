import styles from "./highlighter.module";

const cn = require("classnames");

function Highlighter({ children }) {
  return (
    <div className={cn(styles.highlighter)}>
      {children}
      <span />
    </div>
  );
}

export default Highlighter;
