import * as Styled from './style';

import CartItem from './CartItem';
import SelectedBox from '../assets/SelectedBox.svg';
import UnSelectedBox from '../assets/UnSelectedBox.svg';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  cartItemIdsState,
  selectedAllCartItemState,
} from '../../recoil/selectedCardItems';
import { cartItemsState } from '../../recoil/cartItems';

import MESSAGE from '../../constants/Message';
import { CartItemType } from '../../type';

const CartItems = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const cartItemIds = useRecoilValue(cartItemIdsState);

  const [isAllSelected, setIsAllSelected] = useRecoilState(
    selectedAllCartItemState(cartItemIds),
  );

  const handleSelectedAll = () => {
    setIsAllSelected((isSelectedAll) => !isSelectedAll);
  };

  return (
    <Styled.ItemList>
      <Styled.AllSelectContainer>
        <Styled.SelectButton onClick={handleSelectedAll}>
          <img
            src={isAllSelected ? SelectedBox : UnSelectedBox}
            alt={isAllSelected ? MESSAGE.allSelected : MESSAGE.notAllSelected}
          />
        </Styled.SelectButton>
        <Styled.SelectMessage>{MESSAGE.allSelected}</Styled.SelectMessage>
      </Styled.AllSelectContainer>
      {cartItems.map((cartItem: CartItemType) => {
        return <CartItem inputCartItem={cartItem} />;
      })}
    </Styled.ItemList>
  );
};

export default CartItems;
