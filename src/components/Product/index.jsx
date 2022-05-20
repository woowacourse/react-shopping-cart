import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { addCart, addMoreCart, deleteCart, downCart } from 'reducers/cudCart';

import debounce from 'utils';

import Wrapper from './style';

const Product = ({ id, imgSrc, title, price, cartQuantity }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(cartQuantity);
  const [showQuantity, setShowQuantity] = useState(false);

  const handleClickMinusButton = debounce(
    useCallback(async () => {
      if (quantity === 0) return;

      if (quantity > 1) {
        await dispatch(downCart(id)).unwrap();
      } else {
        await dispatch(deleteCart(id)).unwrap();
      }

      setQuantity((prevQuantity) => prevQuantity - 1);
    }, [dispatch, id, quantity]),
    150,
  );

  const handleClickAddButton = debounce(
    useCallback(async () => {
      if (quantity) {
        await dispatch(addMoreCart(id)).unwrap();
      } else {
        await dispatch(addCart(id)).unwrap();
      }

      setQuantity((prevQuantity) => prevQuantity + 1);
    }, [dispatch, id, quantity]),
    150,
  );

  const handleClickCartImage = useCallback(() => {
    setShowQuantity(!showQuantity);
  }, [showQuantity]);

  return (
    <Wrapper showQuantity={showQuantity}>
      <img className="thumbnail" src={imgSrc} alt={`${title} 상품`} />
      <div className="bottom flex-row-space-between">
        <div>
          <p className="title">{title}</p>
          <p className="price">{price.toLocaleString()}</p>
        </div>
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
      </div>
    </Wrapper>
  );
};

export default Product;
