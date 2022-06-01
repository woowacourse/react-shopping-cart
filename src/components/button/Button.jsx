import cn from "classnames";
import styles from "./button.module";

function Button({ children, onClick, variant, block, className }) {
  const classNames = cn(
    styles.button,
    styles[variant],
    { [styles.block]: block },
    className
  );
  return (
    <button className={classNames} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
