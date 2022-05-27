import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import CheckBox from 'components/CheckBox';

import Wrapper from './style';

import {
  selectCart,
  clearCart,
  addOneQuantity,
  downOneQuantity,
  deleteOneCart,
} from 'reducers/carts';
import { addMoreCart, downCart, deleteCart } from 'reducers/addUpdateDeleteCart';
import { onMessage } from 'reducers/snackbar';

import debounce from 'utils';

import { SNACKBAR_MESSAGE } from 'constants';

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
      dispatch(onMessage(SNACKBAR_MESSAGE.deleteProduct(title)));
    }, [dispatch, id, quantity]),
    150,
  );

  const handleClickAddButton = debounce(
    useCallback(async () => {
      await dispatch(addMoreCart(id)).unwrap();
      dispatch(addOneQuantity(id));
      dispatch(onMessage(SNACKBAR_MESSAGE.addProduct(title)));
    }, [dispatch, id]),
    150,
  );

  const handleClickDeleteButton = useCallback(async () => {
    await dispatch(deleteCart(id)).unwrap();
    dispatch(deleteOneCart(id));
    dispatch(onMessage(SNACKBAR_MESSAGE.clearProduct(title)));
  }, [dispatch, id]);

  return (
    <Wrapper>
      <div className="left">
        <CheckBox id={`cart${id}`} checked={selected} onChange={handleChangeCheckBox} />
        <Link to={`/product/${id}`}>
          <img className="cart-product" src={imgSrc} alt="장바구니에 담긴 상품" />
        </Link>
        <p className="title">{title}</p>
      </div>
      <div className="right">
        <img src="img/Recycle_Bin.png" alt="휴지통" onClick={handleClickDeleteButton} />
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
