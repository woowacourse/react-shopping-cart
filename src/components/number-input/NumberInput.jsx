import CaretUp from "@assets/images/caret-up.svg";
import CaretDown from "@assets/images/caret-down.svg";
import styles from "./number-input.module";

const cn = require("classnames");

function NumberInput({
  value,
  onChange,
  step = 1,
  positive = true,
  maxLength = 3,
  className,
}) {
  const handleChange = (e) => {
    const { target } = e;
    const { selectionStart } = target;
    let cursor = Math.max(0, selectionStart);
    const newValue = target.value.replace(/[^0-9]/g, "");
    if (newValue.length < target.value.length) {
      cursor = Math.max(0, selectionStart - 1);
    }

    queueMicrotask(() => {
      target.setSelectionRange(cursor, cursor);
    });
    onChange && onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = Number(value) + step;
    onChange && onChange(newValue);
  };

  const handleDecrease = () => {
    const newValue = Number(value) - step;
    onChange && onChange(positive ? Math.max(0, newValue) : newValue);
  };

  return (
    <div className={cn(styles.numberInput, className)}>
      <input
        type="text"
        onChange={handleChange}
        value={value}
        maxLength={maxLength}
      />
      <div className={styles.steps}>
        <button type="button" onClick={handleIncrease} className={styles.up}>
          <CaretUp />
        </button>
        <div className={styles.divider} />
        <button type="button" onClick={handleDecrease} className={styles.down}>
          <CaretDown />
        </button>
      </div>
    </div>
  );
}

export default NumberInput;
