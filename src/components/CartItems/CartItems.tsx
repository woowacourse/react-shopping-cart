import * as Styled from './style';

import CartItem from './CartItem';
import SelectedBox from '../assets/SelectedBox.svg';
import UnSelectedBox from '../assets/UnSelectedBox.svg';

import { useRecoilState, useRecoilValue } from 'recoil';

import { cartItemsState } from '../../recoil/atoms';
import {
  cartItemIdsSelector,
  isAllCartItemSelectedSelectorFamily,
} from '../../recoil/selectors';

import MESSAGE from '../../constants/Message';
import { CartItemType } from '../../type';

const CartItems = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const cartItemIds = useRecoilValue(cartItemIdsSelector);

  const [isAllSelected, setIsAllSelected] = useRecoilState(
    isAllCartItemSelectedSelectorFamily(cartItemIds),
  );

  const handleSelectedAll = () => {
    setIsAllSelected((isSelectedAll) => !isSelectedAll);
  };

  return (
    <Styled.CartItems>
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
        return <CartItem key={cartItem.id} inputCartItem={cartItem} />;
      })}
    </Styled.CartItems>
  );
};

export default CartItems;
