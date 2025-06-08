import { useCallback, useState } from "react";

const useBooleanState = (initialValue: boolean) => {
  const [state, setState] = useState(initialValue);
  const setTrue = useCallback(() => setState(true), []);
  const setFalse = useCallback(() => setState(false), []);
  const setToggle = useCallback(() => setState((prev) => !prev), []);

  return [state, setTrue, setFalse, setToggle] as const;
};

export default useBooleanState;
