import Checkbox from 'components/base/checkBox/CheckBox';
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
  const { name, image, price, quantity, isSelect } = product;

  return (
    <ShoppingCartItemContainer>
      <Checkbox checked={isSelect} />
      <ShoppingCartItemBox>
        <Image src={image} width="120" height="120" />
        <ShoppingCartItemName>{name}</ShoppingCartItemName>
        <ShoppingCartItemSidebar>
          <Button style={{ padding: '0 10px 10px 0' }}>
            <TrashCan width="20" height="20" />
          </Button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCartItemQuantitybar>
              <ShoppingCartItemQuantityDisplay>{quantity}</ShoppingCartItemQuantityDisplay>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ShoppingCartItemQuantityButton>⬆️</ShoppingCartItemQuantityButton>
                <ShoppingCartItemQuantityButton>⬇️</ShoppingCartItemQuantityButton>
              </div>
            </ShoppingCartItemQuantitybar>
          </div>
          <ShoppingCartItemTotalPrice>{price}원</ShoppingCartItemTotalPrice>
        </ShoppingCartItemSidebar>
      </ShoppingCartItemBox>
    </ShoppingCartItemContainer>
  );
};

export default ShoppingCartItem;
