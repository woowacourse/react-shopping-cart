import { useState, useEffect } from "react";
import CaretUp from "@assets/images/caret-up.svg";
import CaretDown from "@assets/images/caret-down.svg";
import { flushSync } from "react-dom/cjs/react-dom.production.min";
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
  const [val, setVal] = useState(value);

  const handleChange = (e) => {
    const { target } = e;
    const { selectionStart } = target;
    let cursor = Math.max(0, selectionStart);
    const newValue = target.value.replace(/[^0-9]/g, "");
    if (newValue.length < target.value.length) {
      cursor = Math.max(0, selectionStart - 1);
    }
    flushSync(() => {
      setVal(newValue);
    });
    queueMicrotask(() => {
      target.setSelectionRange(cursor, cursor);
    });
  };

  const handleIncrease = () => setVal((val) => Number(val) + step);

  const handleDecrease = () =>
    setVal((val) => {
      const newValue = Number(val) - step;
      return positive ? Math.max(0, newValue) : newValue;
    });

  useEffect(() => {
    onChange && onChange(val);
  }, [val]);

  return (
    <div className={cn(styles.numberInput, className)}>
      <input
        type="text"
        onChange={handleChange}
        value={val}
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
