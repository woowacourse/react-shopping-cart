import React, { useState } from 'react';

interface AddToCartCount {
  onDeleteCart: () => void;
}

export const AddToCartCount = ({ onDeleteCart }: AddToCartCount) => {
  const [count, setCount] = useState('1');

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value === 0) {
      onDeleteCart();
    }

    if (value < 0) return;

    setCount(e.target.value);
  };

  return (
    <div>
      <input type="number" value={count} onChange={handle} />
    </div>
  );
};
