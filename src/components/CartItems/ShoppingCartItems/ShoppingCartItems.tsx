import * as Styled from '../style';

import { useRecoilState, useRecoilValue } from 'recoil';

import { cartItemsState } from '../../../recoil/atoms';
import {
  cartItemIdsSelector,
  isAllCartItemSelectedSelectorFamily,
} from '../../../recoil/selectors';

import SelectButton from '../../SelectButton/SelectButton';
import SelectButtonContainer from '../../SelectButtonContainer/SelectButtonContainer';

import ShoppingCartItem from './ShoppingCartItem';
import SelectedBox from '../../../assets/SelectedBox.svg';
import UnSelectedBox from '../../../assets/UnSelectedBox.svg';

import MESSAGE from '../../../constants/Message';
import { CartItemType } from '../../../type';

const ShoppingCartItems = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const cartItemIds = useRecoilValue(cartItemIdsSelector);

  const [isAllSelected, setIsAllSelected] = useRecoilState(
    isAllCartItemSelectedSelectorFamily(cartItemIds),
  );

  return (
    <Styled.CartItems>
      <SelectButtonContainer gap="narrow">
        <SelectButton
          onClick={() => setIsAllSelected((isSelectedAll) => !isSelectedAll)}
        >
          <img
            src={isAllSelected ? SelectedBox : UnSelectedBox}
            alt={isAllSelected ? MESSAGE.allSelected : MESSAGE.notAllSelected}
          />
        </SelectButton>
        <Styled.SelectMessage>{MESSAGE.allSelected}</Styled.SelectMessage>
      </SelectButtonContainer>
      {cartItems.map((cartItem: CartItemType) => {
        return <ShoppingCartItem key={cartItem.id} inputCartItem={cartItem} />;
      })}
    </Styled.CartItems>
  );
};

export default ShoppingCartItems;
