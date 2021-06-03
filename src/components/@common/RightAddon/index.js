import React from 'react';
import { ControlButtons } from './index.styles';

const RightAddon = ({ onIncreaseQuantity, onDecreaseQuantity }) => (
  <ControlButtons>
    <button onClick={onIncreaseQuantity}> ▲ </button>
    <button onClick={onDecreaseQuantity}> ▼ </button>
  </ControlButtons>
);

export default RightAddon;
