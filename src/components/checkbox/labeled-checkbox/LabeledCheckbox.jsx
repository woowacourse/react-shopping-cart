import Checkbox from "../single/Checkbox";
import styles from "./labeled-checkbox.module";

const cn = require("classnames");

/* eslint-disable jsx-a11y/label-has-associated-control */
function LabeledCheckbox({ id, label }) {
  return (
    <div className={cn(styles.checkboxContainer)}>
      <Checkbox id={id} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default LabeledCheckbox;
