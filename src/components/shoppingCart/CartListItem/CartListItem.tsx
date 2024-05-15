import { fetchDeleteCartItem } from '@apis/shoppingCart';
import { CartItem } from '@appTypes/shoppingCart';
import { Checkbox, DeleteButton } from '@components/common';
import { CartListDescription } from '@components/shoppingCart';
import { cartItemsSelector, selectedIdsAtom } from '@recoil/shoppingCart';
import { useSetRecoilState } from 'recoil';

import * as Styled from './CartListItem.styled';

interface CartListItemProps {
  cartItem: CartItem;
  isChecked: boolean;
  onChangeCheck: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
}

const CartListItem: React.FC<CartListItemProps> = ({ cartItem, isChecked, onChangeCheck }) => {
  const setCartItems = useSetRecoilState(cartItemsSelector);
  const setSelectedIds = useSetRecoilState(selectedIdsAtom);

  const handleClickDeleteButton = async () => {
    await fetchDeleteCartItem(cartItem.id);

    setCartItems((prevCartItems) => prevCartItems.filter((prevCartItem) => prevCartItem.id !== cartItem.id));
    setSelectedIds((prevSelectedIds) => prevSelectedIds.filter((prevSelectedId) => prevSelectedId !== cartItem.id));
  };

  return (
    <Styled.CartListContainer>
      <Styled.CartItemSelectionGroup>
        <Checkbox checked={isChecked} onChange={(event) => onChangeCheck(event, cartItem.id)} />
        <DeleteButton onClick={handleClickDeleteButton}>삭제</DeleteButton>
      </Styled.CartItemSelectionGroup>
      <Styled.CartItemDetailContainer>
        <Styled.CartItemImage src={cartItem.product.imageUrl} />
        <CartListDescription cartItem={cartItem} />
      </Styled.CartItemDetailContainer>
    </Styled.CartListContainer>
  );
};

export default CartListItem;
