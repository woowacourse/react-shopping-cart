import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useClose from 'hooks/useClose';
import useCart from 'hooks/useCart';

import { Image, CartIcon, QuantityController } from 'components';

import store from 'store/store';
import { doDeleteProductFromCart, doPutProductToCart } from 'actions/actionCreator';

import autoComma from 'utils/autoComma';
import Styled from 'components/ProductItem/index.style';
import { LINK } from 'constants';

const ProductItem = ({ id, name, price, image }) => {
  const [isInCart, product] = useCart(id);
  const [quantity, setQuantity] = useState(isInCart ? product.quantity : 1);

  const navigate = useNavigate();
  const [isControllerOpen, setIsControllerOpen] = useState(false);
  const [clearTimer, setAutoCloseTimer, extendTimer] = useClose();

  const quantityRef = useRef(quantity);
  quantityRef.current = quantity;

  const updateCart = () => {
    setIsControllerOpen(false);
    clearTimer();

    if (quantityRef.current > 0) {
      store.dispatch(doPutProductToCart({ id, quantity: quantityRef.current }));
      return;
    }

    store.dispatch(doDeleteProductFromCart({ id }));
  };

  const handleItemClick = () => {
    navigate(`${LINK.TO_DETAILS}/${id}`);
  };

  const handleCartClick = e => {
    e.stopPropagation();

    if (isControllerOpen) {
      updateCart();
    } else {
      setIsControllerOpen(true);
      setAutoCloseTimer(updateCart);
    }
  };

  const handleQuantityControllerClick = e => {
    e.stopPropagation();
    extendTimer(updateCart);
  };

  return (
    <Styled.Container onClick={handleItemClick}>
      <Image src={image} alt={name} />

      <Styled.ProductController>
        <div>
          <Styled.ProductName>{name}</Styled.ProductName>
          <Styled.ProductPrice>{autoComma(price)}원</Styled.ProductPrice>
        </div>
        <Styled.CartController onClick={handleCartClick}>
          {isInCart ? <Styled.Quantity>{quantity}</Styled.Quantity> : <CartIcon />}
        </Styled.CartController>
      </Styled.ProductController>

      {isControllerOpen && (
        <QuantityController
          handleClick={handleQuantityControllerClick}
          quantity={quantity}
          increase={() => setQuantity(prev => prev + 1)}
          decrease={() => setQuantity(prev => (prev > 0 ? prev - 1 : prev))}
        />
      )}
    </Styled.Container>
  );
};

ProductItem.propTypes = {
  /**
   * 해당 상품의 id
   */
  id: PropTypes.number.isRequired,
  /**
   * 상품의 이름
   */
  name: PropTypes.string.isRequired,
  /**
   * 상품의 가격
   */
  price: PropTypes.number.isRequired,
  /**
   * 상품의 이미지 경로
   */
  image: PropTypes.string.isRequired,
};

export default ProductItem;
