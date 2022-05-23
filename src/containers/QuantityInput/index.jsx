import React from 'react';

import { requestExistProductAdd } from 'modules/cart';
import { useDispatch, useSelector } from 'react-redux';
import { InputWrapperStyled, InputStyled, ButtonStyled } from './style';

function QuantityInput({ productId }) {
  const carts = useSelector((state) => state.cart.carts);
  const cartsIdx = carts.map((product) => product.id);
  const productIdx = cartsIdx.indexOf(productId);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const newCarts = [...carts];
    newCarts[productIdx].quantity = Number(event.target.value);

    dispatch(requestExistProductAdd(newCarts));
  };

  const handleClickIncrease = () => {
    const newCarts = [...carts];
    if (newCarts[productIdx].quantity === 100) return;
    newCarts[productIdx].quantity += 1;

    dispatch(requestExistProductAdd(newCarts));
  };
  const handleClickDecrease = () => {
    const newCarts = [...carts];

    if (newCarts[productIdx].quantity === 1) return;
    newCarts[productIdx].quantity -= 1;

    dispatch(requestExistProductAdd(newCarts));
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
      <ButtonStyled>
        <button onClick={handleClickIncrease} className="increase">
          +
        </button>
        <button onClick={handleClickDecrease} className="decrease">
          -
        </button>
      </ButtonStyled>
    </InputWrapperStyled>
  );
}

export default QuantityInput;
