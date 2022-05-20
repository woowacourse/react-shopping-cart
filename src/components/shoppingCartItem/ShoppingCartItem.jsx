/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { putShoppingCartItem, deleteShoppingCartItem } from 'modules/shoppingCarts';

import CheckBox from 'components/base/checkBox/CheckBox';
import Image from 'components/base/image/Image';
import Button from 'components/base/button/Button';
import {
  ShoppingCartItemBox,
  ShoppingCartItemContainer,
  ShoppingCartItemName,
  ShoppingCartItemSidebar,
  ShoppingCartItemQuantitybar,
  ShoppingCartItemQuantityButton,
  ShoppingCartItemQuantityDisplay,
  ShoppingCartItemTotalPrice,
} from './style';

import { ReactComponent as TrashCan } from 'assets/trash_can.svg';

const ShoppingCartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { name, image, price, id } = product;
  const [quantity, setQuantity] = useState(product.quantity);
  const [isSelect, setIsSelect] = useState(product.isSelect || false);

  const handleClickCheckBox = () => {
    setIsSelect(!isSelect);
  };

  const handleClickIncreaseButton = () => {
    setQuantity(quantity + 1);
  };

  const handleClickDecreaseButton = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      alert('상품 최소 갯수는 1개입니다!');
    }
  };

  const handleClickDeleteButton = () => {
    dispatch(deleteShoppingCartItem({ id }));
  };

  useEffect(() => {
    if (quantity === product.quantity) {
      return;
    }
    dispatch(putShoppingCartItem({ ...product, quantity }));
  }, [quantity]);

  useEffect(() => {
    if (isSelect === product.isSelect) {
      return;
    }
    dispatch(putShoppingCartItem({ ...product, isSelect }));
  }, [isSelect]);

  return (
    <ShoppingCartItemContainer>
      <CheckBox checked={isSelect} onChange={handleClickCheckBox} />
      <ShoppingCartItemBox>
        <Image src={image} width="120" height="120" />
        <ShoppingCartItemName>{name}</ShoppingCartItemName>
        <ShoppingCartItemSidebar>
          <Button style={{ padding: '0 10px 10px 0' }} onClick={handleClickDeleteButton}>
            <TrashCan width="20" height="20" />
          </Button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCartItemQuantitybar>
              <ShoppingCartItemQuantityDisplay>{quantity}</ShoppingCartItemQuantityDisplay>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ShoppingCartItemQuantityButton onClick={handleClickIncreaseButton}>
                  ⬆️
                </ShoppingCartItemQuantityButton>
                <ShoppingCartItemQuantityButton onClick={handleClickDecreaseButton}>
                  ⬇️
                </ShoppingCartItemQuantityButton>
              </div>
            </ShoppingCartItemQuantitybar>
          </div>
          <ShoppingCartItemTotalPrice>{price * quantity}원</ShoppingCartItemTotalPrice>
        </ShoppingCartItemSidebar>
      </ShoppingCartItemBox>
    </ShoppingCartItemContainer>
  );
};

export default ShoppingCartItem;
