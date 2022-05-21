import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useClose from 'hooks/useClose';

import { Image, CartIcon, Modal, Button, Text } from 'components';
import { ReactComponent as PlusIcon } from 'assets/plus_icon.svg';
import { ReactComponent as MinusIcon } from 'assets/minus_icon.svg';

import store from 'store/store';
import { doPutProductToCart } from 'actions/actionCreator';

import Styled from 'components/ProductItem/index.style';

import autoComma from 'utils/autoComma';
import { PRODUCT } from 'constants';

const ProductItem = ({ id }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(PRODUCT.MIN_QUANTITY);
  const { products } = useSelector(state => state.reducer);
  const [clearTimer, setAutoCloseTimer, extendTimer] = useClose();
  const { name, price, image, isInCart } = products.find(product => product.id === id);

  const quantityRef = useRef(quantity);
  quantityRef.current = quantity;

  const putCart = () => {
    setIsOpen(false);
    store.dispatch(doPutProductToCart({ id, quantity: quantityRef.current }));
    clearTimer();
  };

  const handleItemClick = () => {
    navigate(`/details/${id}`);
  };

  const handleCartClick = e => {
    e.stopPropagation();

    if (isOpen) {
      putCart();
    } else {
      setIsOpen(true);
      setAutoCloseTimer(putCart);
    }
  };

  const handleModalClick = e => {
    e.stopPropagation();
    extendTimer(putCart);
  };

  return (
    <Styled.ProductItem onClick={handleItemClick}>
      <Image src={image} />
      <Styled.ProductContainer>
        <div>
          <Styled.ProductText name="true">{name}</Styled.ProductText>
          <Styled.ProductText price="true">{autoComma(price)}원</Styled.ProductText>
        </div>
        <div onClick={handleCartClick}>
          {isInCart ? (
            <Button>
              <Styled.QuantityContainer>{quantity}</Styled.QuantityContainer>
            </Button>
          ) : (
            <CartIcon />
          )}
        </div>
      </Styled.ProductContainer>
      {isOpen && (
        <Modal onClick={handleModalClick}>
          <Button
            onClick={() => setQuantity(prev => (prev > PRODUCT.MIN_QUANTITY ? prev - 1 : prev))}
          >
            <MinusIcon />
          </Button>
          <Text modal="true">{quantity}</Text>
          <Button onClick={() => setQuantity(prev => prev + 1)}>
            <PlusIcon />
          </Button>
        </Modal>
      )}
    </Styled.ProductItem>
  );
};

export default ProductItem;
