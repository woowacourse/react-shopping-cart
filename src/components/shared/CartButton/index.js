import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Minus from '../../common/Icon/Minus';
import Plus from '../../common/Icon/Plus';
import SimpleShoppingCart from '../../common/Icon/SimpleShoppingCart';
import SimpleTrashBin from '../../common/Icon/SimpleTrashBin';

import { removeProduct, addToCart, changeQuantity } from '../../../redux/Cart/actions';
import useSnackbar from '../../../hooks/useSnackbar';
import { APP_MESSAGE } from '../../../constants/message';

import * as Styled from './style';
import useCart from '../../../hooks/useCart';

const CartButton = ({ className, product }) => {
  const [snackbarMessage, setSnackbarMessage] = useSnackbar();
  const [isOpen, setIsOpen] = useState(false);

  const { cartList } = useCart();
  const dispatch = useDispatch();

  const targetProduct = cartList.find((cartItem) => cartItem.productId === product.productId);

  const onClickShoppingCart = () => {
    dispatch(addToCart(product));
    setIsOpen(true);

    setSnackbarMessage(APP_MESSAGE.PRODUCT_ADDED_TO_CART); // TODO: 장바구니 추가에 성공하면 띄우기
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onIncrease = () => {
    dispatch(changeQuantity(targetProduct?.cartId, targetProduct?.quantity + 1));
  };

  const onDecrease = () => {
    dispatch(changeQuantity(targetProduct?.cartId, targetProduct?.quantity - 1));
  };

  const onRemove = () => {
    dispatch(removeProduct(targetProduct?.cartId));
    onClose();
  };

  return (
    <Styled.CartButtonContainer className={className} onMouseLeave={onClose}>
      <Styled.CartButtonInner quantity={targetProduct?.quantity} isOpen={isOpen}>
        {targetProduct?.quantity <= 1 ? (
          <Styled.IconButton onClick={onRemove} isHidden={!isOpen}>
            <SimpleTrashBin />
          </Styled.IconButton>
        ) : (
          <Styled.IconButton onClick={onDecrease} isHidden={!isOpen}>
            <Minus />
          </Styled.IconButton>
        )}

        {targetProduct?.quantity ? (
          <Styled.Quantity onMouseEnter={onOpen}>{targetProduct?.quantity}</Styled.Quantity>
        ) : (
          <Styled.IconButton onClick={onClickShoppingCart}>
            <SimpleShoppingCart />
          </Styled.IconButton>
        )}
        <Styled.IconButton onClick={onIncrease} isHidden={!isOpen}>
          <Plus />
        </Styled.IconButton>
      </Styled.CartButtonInner>
    </Styled.CartButtonContainer>
  );
};

CartButton.propTypes = {
  className: PropTypes.string,
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default CartButton;
