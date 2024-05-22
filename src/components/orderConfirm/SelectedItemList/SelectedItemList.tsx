import { CartItem } from '@appTypes/shoppingCart';
import { CartItemInfo } from '@components/common';

const SelectedItemList = ({ selectedItems }: { selectedItems: CartItem[] }) => {
  return (
    <>
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
    </>
  );
};

export default SelectedItemList;
