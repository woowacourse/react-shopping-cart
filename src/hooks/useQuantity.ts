import { useState, useEffect } from "react";
import { IdQuantity } from "../types";

type UseQuantityUpdaterProps = {
  productId: number;
  initialValue: number;
  minValue: number;
  onChange: (data: IdQuantity) => void;
};

type InputState = {
  value: string;
  focusState: "initial" | "focused" | "blurred";
};

const removeNonDigits = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};

const useQuantityUpdater = ({
  productId,
  initialValue,
  minValue,
  onChange,
}: UseQuantityUpdaterProps) => {
  const [inputState, setInputState] = useState<InputState>({
    value: initialValue.toString(),
    focusState: "initial",
  });

  const initializeInputValue = () => {
    setInputState(() => ({
      value: "1",
      focusState: "blurred",
    }));
  };

  const updateInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const focusState =
      event.currentTarget === document.activeElement ? "focused" : "blurred";
    const newInputValue = removeNonDigits(event.target.value);

    setInputState(() => ({
      value: newInputValue,
      focusState,
    }));
  };

  const incrementInputValue = (incrementValue: number) => {
    setInputState(({ value }) => ({
      value: Math.max(Number(value) + incrementValue, minValue).toString(),
      focusState: "blurred",
    }));
  };

  useEffect(() => {
    const { value, focusState } = inputState;

    if (focusState === "blurred") {
      onChange({ id: productId, quantity: Number(value) });
    }
  }, [inputState, onChange, productId]);

  useEffect(() => {
    setInputState(({ focusState }) => ({
      value: initialValue.toString(),
      focusState,
    }));
  }, [initialValue]);

  return {
    updateInputValue,
    initializeInputValue,
    incrementInputValue,
    inputValue: inputState.value,
    isButtonMode:
      Number(inputState.value) <= 0 && inputState.focusState !== "focused",
  };
};

export default useQuantityUpdater;
