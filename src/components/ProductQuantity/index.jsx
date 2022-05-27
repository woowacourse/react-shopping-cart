import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Wrapper from './style';

import { addCart, addMoreCart, deleteCart, downCart } from 'reducers/addUpdateDeleteCart';
import { onMessage } from 'reducers/snackbar';

import debounce from 'utils';

import { SNACKBAR_MESSAGE } from 'constants';

const ProductQuantity = ({ productId, productTitle, cartQuantity, children }) => {
  const dispatch = useDispatch();
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartQuantity);

  const handleClickMinusButton = debounce(
    useCallback(async () => {
      if (quantity === 0) return;

      if (quantity > 1) {
        await dispatch(downCart(productId)).unwrap();
      } else {
        await dispatch(deleteCart(productId)).unwrap();
      }

      setQuantity(quantity - 1);
      dispatch(onMessage(SNACKBAR_MESSAGE.deleteProduct(productTitle)));
    }, [dispatch, productId, quantity]),
    150,
  );

  const handleClickAddButton = debounce(
    useCallback(async () => {
      if (quantity) {
        await dispatch(addMoreCart(productId)).unwrap();
      } else {
        await dispatch(addCart(productId)).unwrap();
      }

      setQuantity(quantity + 1);
      dispatch(onMessage(SNACKBAR_MESSAGE.addProduct(productTitle)));
    }, [dispatch, productId, quantity]),
    150,
  );

  const handleClickCartImage = useCallback(() => {
    setShowQuantity(!showQuantity);
  }, [showQuantity]);

  return (
    <Wrapper showQuantity={showQuantity}>
      {children}
      <div className="circle minus" onClick={handleClickMinusButton}>
        <p>-</p>
      </div>
      <div className="circle quantity">
        <p>{quantity}</p>
      </div>
      <div className="circle plus" onClick={handleClickAddButton}>
        <p>+</p>
      </div>
      <div className="img-wrapper" onClick={handleClickCartImage}>
        <img src="/img/shopping-cart-black.png" alt="장바구니" />
      </div>
    </Wrapper>
  );
};

export default ProductQuantity;
