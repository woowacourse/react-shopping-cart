import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useClose from 'hooks/useClose';

import Image from 'components/base/image/Image';
import CartIcon from 'components/base/cartIcon/CartIcon';
import QuantityBox from 'components/quantityBox/QuantityBox';
import Button from 'components/base/button/Button';
import Text from 'components/base/text/Text';
import { ReactComponent as PlusIcon } from 'assets/plus_icon.svg';
import { ReactComponent as MinusIcon } from 'assets/minus_icon.svg';

import {
  StyledProductItem,
  StyledProductContainer,
  StyledProductText,
  StyledQuantityContainer,
} from 'components/productItem/style';

import { PRODUCT } from 'constants/constants';
import { postShoppingCartItem, putShoppingCartItem } from 'modules/shoppingCarts';

const ProductItem = ({ id }) => {
  const dispatch = useDispatch();
  const { productList } = useSelector(state => state.productReducer.products);
  const { shoppingCartList } = useSelector(state => state.shoppingCartReducer.shoppingCarts);
  const [clearTimer, autoClose] = useClose();
  const product = productList.find(product => product.id === id);
  const { name, price, image } = product;
  const shoppingCartItem = shoppingCartList.find(product => product.id === id);
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(
    shoppingCartItem ? shoppingCartItem.quantity : PRODUCT.MIN_QUANTITY,
  );

  const quantityRef = useRef(quantity);
  quantityRef.current = quantity;

  const putCart = () => {
    setIsOpen(false);
    const isProductInCart = shoppingCartList.some(product => product.id === id);
    if (isProductInCart) {
      dispatch(putShoppingCartItem({ ...product, quantity, isSelect: false }));
    } else {
      dispatch(postShoppingCartItem({ ...product, quantity, isSelect: false }));
    }
    clearTimer();
  };

  const handleCartClick = () => {
    if (isOpen) {
      putCart();
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      autoClose(putCart, quantity);
    }
  };

  const handleModalClick = () => {
    clearTimer();
    autoClose(putCart, quantity);
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
          {shoppingCartItem ? (
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
