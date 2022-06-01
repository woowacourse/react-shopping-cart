import cn from "classnames";
import { useEffect, useState } from "react";
import CaretUp from "@assets/images/caret-up.svg";
import CaretDown from "@assets/images/caret-down.svg";
import styles from "./number-input.module";

function NumberInput({
  value,
  onChange,
  step = 1,
  positive = true,
  maxLength = 3,
  className,
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (onChange && localValue !== value) {
      onChange(localValue);
    }
  }, [localValue, value, onChange]);

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

    setLocalValue(newValue);
  };

  const handleIncrease = () => {
    setLocalValue((prev) => Number(prev) + step);
  };

  const handleDecrease = () => {
    setLocalValue((prev) =>
      positive ? Math.max(0, Number(prev) - step) : Number(prev) - step
    );
  };

  return (
    <div className={cn(styles.numberInput, className)}>
      <input
        type="text"
        onChange={handleChange}
        value={localValue}
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
