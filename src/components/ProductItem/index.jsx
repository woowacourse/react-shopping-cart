import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useClose from 'hooks/useClose';

import { Image, CartIcon, QuantityController } from 'components';

import store from 'store/store';
import { doDeleteProductFromCart, doPutProductToCart } from 'actions/actionCreator';

import Styled from 'components/ProductItem/index.style';

import autoComma from 'utils/autoComma';
import { PRODUCT } from 'constants';

const ProductItem = ({ id }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(PRODUCT.MIN_QUANTITY);
  const { products, shoppingCart } = useSelector(state => state.reducer);
  const [clearTimer, setAutoCloseTimer, extendTimer] = useClose();
  const { name, price, image, isInCart } = products.find(product => product.id === id);

  const quantityRef = useRef(quantity);
  quantityRef.current = quantity;

  useEffect(() => {
    if (isInCart) {
      setQuantity(shoppingCart.find(product => product.id === id).quantity);
    }
  }, [isInCart, id, shoppingCart]);

  const controlCart = () => {
    setIsOpen(false);
    clearTimer();

    if (quantityRef.current > 0) {
      store.dispatch(doPutProductToCart({ id, quantity: quantityRef.current }));
      return;
    }

    store.dispatch(doDeleteProductFromCart({ id }));
  };

  const handleItemClick = () => {
    navigate(`/details/${id}`);
  };

  const handleCartClick = e => {
    e.stopPropagation();

    if (isOpen) {
      controlCart();
    } else {
      setIsOpen(true);
      setAutoCloseTimer(controlCart);
    }
  };

  const handleModalClick = e => {
    e.stopPropagation();
    extendTimer(controlCart);
  };

  return (
    <Styled.ProductItem onClick={handleItemClick}>
      <Image src={image} alt={name} />
      <Styled.ProductContainer>
        <div>
          <Styled.ProductText name="true">{name}</Styled.ProductText>
          <Styled.ProductText price="true">{autoComma(price)}원</Styled.ProductText>
        </div>
        <Styled.CartContainer onClick={handleCartClick}>
          {isInCart ? (
            <Styled.QuantityContainer>{quantity}</Styled.QuantityContainer>
          ) : (
            <CartIcon />
          )}
        </Styled.CartContainer>
      </Styled.ProductContainer>
      {isOpen && (
        <QuantityController
          handleClick={handleModalClick}
          quantity={quantity}
          increase={() => setQuantity(prev => prev + 1)}
          decrease={() => setQuantity(prev => (prev > 0 ? prev - 1 : prev))}
        />
      )}
    </Styled.ProductItem>
  );
};

export default ProductItem;
