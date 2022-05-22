import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useClose from 'hooks/useClose';

import { Image, CartIcon, QuantityController } from 'components';

import store from 'store/store';
import { doDeleteProductFromCart, doPutProductToCart } from 'actions/actionCreator';

import autoComma from 'utils/autoComma';
import { PRODUCT, ROUTES } from 'constants';
import Styled from 'components/ProductItem/index.style';

const ProductItem = ({ id }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(PRODUCT.MIN_QUANTITY);
  const { products, shoppingCart } = useSelector(state => state.reducer);
  const [clearTimer, setAutoCloseTimer, extendTimer] = useClose();
  const { name, price, image, isInCart } = products.find(product => product.id === id);

  const quantityRef = useRef(quantity);
  quantityRef.current = quantity;

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
    navigate(`/${ROUTES.DETAILS}/${id}`);
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

  const handleQuantityControllerClick = e => {
    e.stopPropagation();
    extendTimer(controlCart);
  };

  useEffect(() => {
    if (isInCart) {
      setQuantity(shoppingCart.find(product => product.id === id).quantity);
    }
  }, [isInCart, shoppingCart, id]);

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

      {isOpen && (
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

export default ProductItem;
