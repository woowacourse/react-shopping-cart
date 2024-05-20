import * as Styled from './style';

import Item from './Item';
import SelectedBox from '../assets/SelectedBox.svg';
import UnSelectedBox from '../assets/UnSelectedBox.svg';

import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedAllCartItemState } from '../../recoil/selectedCardItems';
import { cartItemsState } from '../../recoil/cartItems';

import MESSAGE from '../../constants/Message';
import { CartItem } from '../../type';

const ItemList = () => {
  const cartItems = useRecoilValue(cartItemsState);

  const cartItemIds = cartItems.map((cartItem) => cartItem.id);
  const [isAllSelected, setisAllSelected] = useRecoilState(
    selectedAllCartItemState(cartItemIds),
  );
  const handleSelectedAll = () => {
    setisAllSelected((isSelectedAll) => !isSelectedAll);
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
      {cartItems.map((cartItem: CartItem) => {
        return <Item inputCartItem={cartItem} />;
      })}
    </Styled.ItemList>
  );
};

export default ItemList;
