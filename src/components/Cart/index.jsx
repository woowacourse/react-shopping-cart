import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import CheckBox from 'components/CheckBox';

import Wrapper from './style';

import {
  selectCart,
  clearCart,
  addOneQuantity,
  downOneQuantity,
  deleteOneCart,
} from 'reducers/carts';
import { addMoreCart, downCart, deleteCart } from 'reducers/cudCart';

import debounce from 'utils';

const Cart = ({ id, imgSrc, title, quantity, price, selected }) => {
  const dispatch = useDispatch();

  const handleChangeCheckBox = useCallback(() => {
    dispatch(selected ? clearCart(id) : selectCart(id));
  }, [dispatch, selected, id]);

  const handleClickMinusButton = debounce(
    useCallback(async () => {
      if (quantity === 1) return;

      await dispatch(downCart(id)).unwrap();
      dispatch(downOneQuantity(id));
    }, [dispatch, id, quantity]),
    150,
  );

  const handleClickAddButton = debounce(
    useCallback(async () => {
      await dispatch(addMoreCart(id)).unwrap();
      dispatch(addOneQuantity(id));
    }, [dispatch, id]),
    150,
  );

  const handleClickRecycleBin = useCallback(async () => {
    await dispatch(deleteCart(id));
    dispatch(deleteOneCart(id));
  }, [dispatch, id]);

  return (
    <Wrapper>
      <div className="left">
        <CheckBox id={`cart${id}`} checked={selected} onChange={handleChangeCheckBox} />
        <img src={imgSrc} alt="장바구니에 담긴 상품" />
        <p className="title">{title}</p>
      </div>
      <div className="right">
        <img src="img/Recycle_Bin.png" alt="휴지통" onClick={handleClickRecycleBin} />
        <div className="quantity-wrapper">
          <div className="quantity">
            <p>{quantity}</p>
          </div>
          <div className="plus-minus-wrapper">
            <div className="plus" onClick={handleClickAddButton}>
              <div></div>
            </div>
            <div className="minus" onClick={handleClickMinusButton}>
              <div></div>
            </div>
          </div>
        </div>
        <p className="price">{price.toLocaleString()}원</p>
      </div>
    </Wrapper>
  );
};

export default Cart;
