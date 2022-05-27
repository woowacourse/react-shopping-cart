import React, { useState, useCallback, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import Wrapper from './style';

import { addCart, addMoreCart, deleteCart, downCart } from 'reducers/addUpdateDeleteCart';
import { onMessage } from 'reducers/snackbar';
import { open, close } from 'reducers/productQuantity';

import debounce from 'utils';

import { SNACKBAR_MESSAGE } from 'constants';

const ProductQuantity = ({ productId, productTitle, cartQuantity, children }) => {
  const dispatch = useDispatch();
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartQuantity);
  const { isOpended } = useSelector((state) => state.productQuantity);

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

  const handleClickCartImage = useCallback(async () => {
    if (quantity === 0 && !showQuantity) {
      await dispatch(addCart(productId)).unwrap();
      setQuantity(quantity + 1);
    }

    flushSync(() => {
      dispatch(showQuantity ? close() : open());
    });

    setShowQuantity(!showQuantity);
    quantity === 0 &&
      !showQuantity &&
      dispatch(onMessage(SNACKBAR_MESSAGE.addProduct(productTitle)));
  }, [showQuantity, quantity]);

  useEffect(() => {
    if (isOpended) {
      setShowQuantity(false);
    }
  }, [isOpended]);

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
