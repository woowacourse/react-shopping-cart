import React from 'react';

import {
  requestExistProductAdd,
  requestExistProductDecrease,
  requestUpdateProductQuantity,
} from 'modules/cart';
import { useDispatch, useSelector } from 'react-redux';
import { InputWrapperStyled, InputStyled, ButtonWrapperStyled } from './style';

function QuantityInput({ productId }) {
  const carts = useSelector((state) => state.cart.carts);
  const cartsIdx = carts.map((product) => product.id);
  const productIdx = cartsIdx.indexOf(productId);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const newCarts = [...carts];
    newCarts[productIdx].quantity = Number(event.target.value);

    dispatch(requestUpdateProductQuantity(productIdx, event.target.value));
  };

  const handleClickIncrease = () => {
    if (carts[productIdx].quantity === 100) return;

    dispatch(requestExistProductAdd(productIdx));
  };
  const handleClickDecrease = () => {
    if (carts[productIdx].quantity === 1) return;

    dispatch(requestExistProductDecrease(productIdx));
  };

  return (
    <InputWrapperStyled>
      <InputStyled
        type="number"
        min="1"
        max="100"
        step="1"
        onChange={handleChange}
        value={carts[productIdx].quantity}
      />
      <ButtonWrapperStyled>
        <button onClick={handleClickIncrease} className="increase">
          +
        </button>
        <button onClick={handleClickDecrease} className="decrease">
          -
        </button>
      </ButtonWrapperStyled>
    </InputWrapperStyled>
  );
}

export default QuantityInput;
