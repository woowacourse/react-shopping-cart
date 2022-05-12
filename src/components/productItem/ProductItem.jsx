import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Image from 'components/shared/image/Image';
import CartIcon from 'components/shared/cartIcon/CartIcon';
import Modal from 'components/shared/modal/Modal';
import Button from 'components/shared/button/Button';
import Text from 'components/shared/text/Text';
import { ReactComponent as PlusIcon } from 'assets/plus_icon.svg';
import { ReactComponent as MinusIcon } from 'assets/minus_icon.svg';

import store from 'store/store';
import { PUT } from 'actions/action';

import {
  StyledProductItem,
  StyledProductContainer,
  StyledProductText,
} from 'components/productItem/style';

import { PRODUCT, MODAL } from 'constants';

const ProductItem = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { products } = useSelector(state => state.reducer);
  const { name, price, image, isInCart } = products.find(product => product.id === id);
  const [quantity, setQuantity] = useState(PRODUCT.MIN_QUANTITY);

  const [debounce, setDebounce] = useState(null);
  const [autoDebounce, setAutoDebounce] = useState(null);

  const quantityRef = useRef(quantity);
  quantityRef.current = quantity;

  const clearTimer = () => {
    if (debounce) {
      clearTimeout(debounce);
    }

    if (autoDebounce) {
      clearTimeout(autoDebounce);
    }
  };

  const putCart = () => {
    setIsOpen(false);
    store.dispatch({ type: PUT, id, quantity: quantityRef.current });
    clearTimer();
  };

  const handleClick = () => {
    if (isOpen) {
      putCart();
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      setDebounce(setTimeout(() => putCart(), MODAL.CLOSE_TIME));
    }
  };

  const handleModal = () => {
    clearTimer();
    setAutoDebounce(setTimeout(() => putCart(), MODAL.CLOSE_TIME));
  };

  return (
    <StyledProductItem>
      <Image src={image} />
      <StyledProductContainer>
        <div>
          <StyledProductText name="true">{name}</StyledProductText>
          <StyledProductText price="true">{price}원</StyledProductText>
        </div>
        <div>
          {isInCart ? (
            <Button>
              <div
                style={{
                  backgroundColor: '#2AC1BC',
                  width: '50px',
                  height: '50px',
                  borderRadius: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                }}
                onClick={handleClick}
              >
                {quantity}
              </div>
            </Button>
          ) : (
            <CartIcon onClick={handleClick} />
          )}
        </div>
      </StyledProductContainer>
      {isOpen && (
        <Modal onClick={handleModal}>
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
    </StyledProductItem>
  );
};

export default ProductItem;
