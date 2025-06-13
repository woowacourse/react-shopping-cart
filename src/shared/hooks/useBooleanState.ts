import { useCallback, useState } from "react";

const useBooleanState = (initialValue: boolean = false) => {
  const [boolean, setBoolean] = useState(initialValue);

  const setTrue = useCallback(() => {
    setBoolean(true);
  }, []);

  const setFalse = useCallback(() => {
    setBoolean(false);
  }, []);

  const toggle = useCallback(() => {
    setBoolean((prevBool) => !prevBool);
  }, []);

  return [boolean, setTrue, setFalse, toggle] as const;
};

export default useBooleanState;
