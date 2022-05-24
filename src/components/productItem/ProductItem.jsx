import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import useClose from 'hooks/useClose';

import Image from 'components/base/image/Image';
import CartIcon from 'components/base/cartIcon/CartIcon';
import QuantityBox from 'components/quantityBox/QuantityBox';
import Button from 'components/base/button/Button';
import Text from 'components/base/text/Text';
import { ReactComponent as PlusIcon } from 'assets/plus_icon.svg';
import { ReactComponent as MinusIcon } from 'assets/minus_icon.svg';

import { postShoppingCartItem, putShoppingCartItem } from 'middlewares/shoppingCarts';

import {
  StyledProductItem,
  StyledProductContainer,
  StyledProductText,
  StyledQuantityContainer,
} from 'components/productItem/style';

import { PRODUCT } from 'constants/constants';

const ProductItem = ({ product, cartItem }) => {
  const dispatch = useDispatch();
  const [clearTimer, autoClose] = useClose();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : PRODUCT.MIN_QUANTITY);
  const quantityRef = useRef(quantity);
  const { name, price, image } = product;
  quantityRef.current = quantity;

  const addItemShoppingCart = () => {
    setIsOpen(false);
    if (cartItem) {
      dispatch(putShoppingCartItem({ ...product, quantity, isSelect: false }));
    } else {
      dispatch(postShoppingCartItem({ ...product, quantity, isSelect: false }));
    }
    clearTimer();
  };

  const handleCartClick = () => {
    if (isOpen) {
      addItemShoppingCart();
    } else {
      setIsOpen(true);
      autoClose(addItemShoppingCart, quantity);
    }
  };

  const handleModalClick = () => {
    clearTimer();
    autoClose(addItemShoppingCart, quantity);
  };

  return (
    <StyledProductItem>
      <Image src={image} />
      <StyledProductContainer>
        <div>
          <StyledProductText name="true">{name}</StyledProductText>
          <StyledProductText price="true">{price}원</StyledProductText>
        </div>
        <div onClick={handleCartClick}>
          {cartItem ? (
            <Button>
              <StyledQuantityContainer>{quantity}</StyledQuantityContainer>
            </Button>
          ) : (
            <CartIcon />
          )}
        </div>
      </StyledProductContainer>
      {isOpen && (
        <QuantityBox onClick={handleModalClick}>
          <Button
            onClick={() => setQuantity(prev => (prev > PRODUCT.MIN_QUANTITY ? prev - 1 : prev))}
          >
            <MinusIcon />
          </Button>
          <Text modal="true">{quantity}</Text>
          <Button onClick={() => setQuantity(prev => prev + 1)}>
            <PlusIcon />
          </Button>
        </QuantityBox>
      )}
    </StyledProductItem>
  );
};

export default ProductItem;
