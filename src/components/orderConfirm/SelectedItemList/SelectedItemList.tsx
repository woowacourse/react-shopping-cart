import { CartItem } from '@appTypes/shoppingCart';
import { CartItemInfo } from '@components/common';

import * as Styled from './SelectedItemList.styled';

const SelectedItemList = ({ selectedItems }: { selectedItems: CartItem[] }) => {
  return (
    <Styled.SelectListItemList>
      {selectedItems.map((cartItem) => (
        <CartItemInfo.DetailContainer>
          <CartItemInfo.Img cartItem={cartItem} />
          <CartItemInfo.Description>
            <CartItemInfo.Name cartItem={cartItem} />
            <CartItemInfo.Price cartItem={cartItem} />
            <CartItemInfo.Quantity cartItem={cartItem} />
          </CartItemInfo.Description>
        </CartItemInfo.DetailContainer>
      ))}
    </Styled.SelectListItemList>
  );
};

export default SelectedItemList;
