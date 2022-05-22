import styles from "./checkbox.module";

const cn = require("classnames");

/* eslint-disable jsx-a11y/label-has-associated-control */
function Checkbox({ id, onChange, checked, className }) {
  return (
    <div className={cn(styles.checkbox, className)}>
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
        {...(checked ? { checked: true } : {})}
      />
      <label htmlFor={id} />
    </div>
  );
}

export default Checkbox;
