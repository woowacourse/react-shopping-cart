import React from "react";
import { useQuantity } from "hooks/useQuantity";
import Counter from "components/common/Counter";

interface QuantityCounterProps {
  itemId: number;
}

const QuantityCounter = ({ itemId }: QuantityCounterProps) => {
  const { quantity, setNewQuantity, handleQuantityChanged, handleQuantityBlured } =
    useQuantity(itemId);

  const handleCountInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement) || e.key !== "Enter") return;
    e.target.blur();
  };

  return (
    <>
      <Counter
        value={quantity}
        setValue={setNewQuantity}
        onChange={handleQuantityChanged}
        onKeyDown={handleCountInputKey}
        onBlur={handleQuantityBlured}
        placeholder="수량"
      />
    </>
  );
};

export default QuantityCounter;
