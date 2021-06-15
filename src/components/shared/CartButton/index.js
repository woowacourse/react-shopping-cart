import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProduct, addToCart, changeAmount } from '../../../redux/Cart/actions';
import Minus from '../../common/Icon/Minus';
import Plus from '../../common/Icon/Plus';
import SimpleShoppingCart from '../../common/Icon/SimpleShoppingCart';
import SimpleTrashBin from '../../common/Icon/SimpleTrashBin';
import * as Styled from './style';

const CartButton = ({ className, product }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const getAmount = () => {
    const productInCart = cart.find((ele) => ele.id === product.id);

    return productInCart ? productInCart.amount : 0;
  };
  const amount = getAmount();

  const onClickShoppingCart = () => {
    dispatch(addToCart(product));
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onIncrease = () => {
    dispatch(changeAmount(product.id, amount + 1));
  };

  const onDecrease = () => {
    dispatch(changeAmount(product.id, amount - 1));
  };

  const onRemove = () => {
    dispatch(removeProduct(product.id));
    onClose();
  };

  return (
    <Styled.CartButtonContainer className={className} onMouseLeave={onClose}>
      <Styled.CartButtonInner amount={amount} isOpen={isOpen}>
        {amount <= 1 ? (
          <Styled.IconButton onClick={onRemove} isHidden={!isOpen}>
            <SimpleTrashBin />
          </Styled.IconButton>
        ) : (
          <Styled.IconButton onClick={onDecrease} isHidden={!isOpen}>
            <Minus />
          </Styled.IconButton>
        )}

        {amount ? (
          <Styled.Amount onMouseEnter={onOpen}>{amount}</Styled.Amount>
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
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartButton;
