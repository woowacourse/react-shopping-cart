import { CartItem } from '@appTypes/shoppingCart';
import { CartItemInfo } from '@components/common';

import * as Styled from './SelectedItemList.styled';

const SelectedItemList = ({ selectedItems }: { selectedItems: CartItem[] }) => {
  return (
    <Styled.SelectedItemList>
      {selectedItems.map((cartItem) => (
        <CartItemInfo.DetailContainer key={cartItem.id}>
          <CartItemInfo.Img cartItem={cartItem} />
          <CartItemInfo.Description>
            <CartItemInfo.Name cartItem={cartItem} />
            <CartItemInfo.Price cartItem={cartItem} />
            <CartItemInfo.Quantity cartItem={cartItem} />
          </CartItemInfo.Description>
        </CartItemInfo.DetailContainer>
      ))}
    </Styled.SelectedItemList>
  );
};

export default SelectedItemList;
