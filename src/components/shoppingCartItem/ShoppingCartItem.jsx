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

const ShoppingCartItem = () => {
  return (
    <ShoppingCartItemContainer>
      <Checkbox />
      <ShoppingCartItemBox>
        <Image width="120" height="120" />
        <ShoppingCartItemName>삼다수</ShoppingCartItemName>
        <ShoppingCartItemSidebar>
          <Button style={{ padding: '0 10px 10px 0' }}>
            <TrashCan width="20" height="20" />
          </Button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCartItemQuantitybar>
              <ShoppingCartItemQuantityDisplay>3</ShoppingCartItemQuantityDisplay>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ShoppingCartItemQuantityButton>⬆️</ShoppingCartItemQuantityButton>
                <ShoppingCartItemQuantityButton>⬇️</ShoppingCartItemQuantityButton>
              </div>
            </ShoppingCartItemQuantitybar>
          </div>
          <ShoppingCartItemTotalPrice>5,100원</ShoppingCartItemTotalPrice>
        </ShoppingCartItemSidebar>
      </ShoppingCartItemBox>
    </ShoppingCartItemContainer>
  );
};

export default ShoppingCartItem;
