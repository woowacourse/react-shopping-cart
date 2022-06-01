import cn from "classnames";
import Checkbox from "../single/Checkbox";
import styles from "./labeled-checkbox.module";

/* eslint-disable jsx-a11y/label-has-associated-control */
function LabeledCheckbox({ id, label, onChange, checked }) {
  return (
    <div className={cn(styles.checkboxContainer)}>
      <Checkbox id={id} onChange={onChange} checked={checked} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

LabeledCheckbox.defaultProps = {
  onChange: () => undefined,
};

export default LabeledCheckbox;
