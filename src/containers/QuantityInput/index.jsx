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
    console.log(carts);
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
        <button className="increase"> + </button>
        <button className="decrease"> - </button>
      </ButtonStyled>
    </InputWrapperStyled>
  );
}

export default QuantityInput;
