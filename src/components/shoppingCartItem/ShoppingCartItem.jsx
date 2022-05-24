import { useDispatch } from 'react-redux';

import { putShoppingCartItem, deleteShoppingCartItem } from 'middlewares/shoppingCarts';

import CheckBox from 'components/base/checkBox/CheckBox';
import Image from 'components/base/image/Image';
import Button from 'components/base/button/Button';
import {
  ShoppingCartBox,
  ShoppingCartContainer,
  Name,
  Sidebar,
  Quantitybar,
  QuantityButton,
  QuantityDisplay,
  TotalPrice,
} from './style';

import { ReactComponent as TrashCan } from 'assets/trash_can.svg';

const ShoppingCartItem = ({ product }) => {
  const dispatch = useDispatch();
  const { name, image, price, id, quantity } = product;
  const isSelect = product.isSelect || false;

  const handleClickCheckBox = () => {
    dispatch(putShoppingCartItem({ ...product, isSelect: !isSelect }));
  };

  const handleClickIncreaseButton = () => {
    dispatch(putShoppingCartItem({ ...product, quantity: quantity + 1 }));
  };

  const handleClickDecreaseButton = () => {
    if (quantity > 1) {
      dispatch(putShoppingCartItem({ ...product, quantity: quantity - 1 }));
      return;
    }
    alert('상품 최소 갯수는 1개입니다!');
  };

  const handleClickDeleteButton = () => {
    dispatch(deleteShoppingCartItem({ id }));
  };

  return (
    <ShoppingCartContainer>
      <CheckBox checked={isSelect} onChange={handleClickCheckBox} />
      <ShoppingCartBox>
        <Image src={image} width="120" height="120" />
        <Name>{name}</Name>
        <Sidebar>
          <Button style={{ padding: '0 10px 10px 0' }} onClick={handleClickDeleteButton}>
            <TrashCan width="20" height="20" />
          </Button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Quantitybar>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <QuantityButton onClick={handleClickIncreaseButton}>⬆️</QuantityButton>
                <QuantityButton onClick={handleClickDecreaseButton}>⬇️</QuantityButton>
              </div>
            </Quantitybar>
          </div>
          <TotalPrice>{price * quantity}원</TotalPrice>
        </Sidebar>
      </ShoppingCartBox>
    </ShoppingCartContainer>
  );
};

export default ShoppingCartItem;
