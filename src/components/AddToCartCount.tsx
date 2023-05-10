import React, { useState } from 'react';
import styled from 'styled-components';

interface AddToCartCountProps {
  onDeleteCart: () => void;
}

export const AddToCartCount = ({ onDeleteCart }: AddToCartCountProps) => {
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
      <CountInput type="number" value={count} onChange={handle} />
    </div>
  );
};

const CountInput = styled.input`
  width: 68px;
  border: 1px solid #333333;
  text-align: center;
`;
