import styles from "./checkbox.module";

const cn = require("classnames");

/* eslint-disable jsx-a11y/label-has-associated-control */
function Checkbox({ id }) {
  return (
    <div className={cn(styles.checkbox)}>
      <input type="checkbox" id={id} />
      <label htmlFor={id} />
    </div>
  );
}

export default Checkbox;
