import * as Styled from '../style';

import { useRecoilState, useRecoilValue } from 'recoil';

import { cartItemsState } from '../../../recoil/atoms';
import {
  cartItemIdsSelector,
  isAllCartItemSelectedSelectorFamily,
} from '../../../recoil/selectors';

import SelectButton from '../../SelectButton/SelectButton';

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

  const handleSelectedAll = () => {
    setIsAllSelected((isSelectedAll) => !isSelectedAll);
  };

  return (
    <Styled.CartItems>
      <Styled.AllSelectContainer>
        <SelectButton handleOnClick={handleSelectedAll}>
          <img
            src={isAllSelected ? SelectedBox : UnSelectedBox}
            alt={isAllSelected ? MESSAGE.allSelected : MESSAGE.notAllSelected}
          />
        </SelectButton>
        <Styled.SelectMessage>{MESSAGE.allSelected}</Styled.SelectMessage>
      </Styled.AllSelectContainer>
      {cartItems.map((cartItem: CartItemType) => {
        return <ShoppingCartItem key={cartItem.id} inputCartItem={cartItem} />;
      })}
    </Styled.CartItems>
  );
};

export default ShoppingCartItems;
