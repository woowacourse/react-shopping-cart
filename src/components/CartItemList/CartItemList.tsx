import { CartItemType } from '../../type';
import CartItem from './CartItem';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectedAllCartItemSelector } from '../../recoil/selectedCardItems';
import { cartItemsState } from '../../recoil/cartItems';

const CartItemList = () => {
  const cartItems = useRecoilValue(cartItemsState);

  const [selectedAll, setSelectedAll] = useRecoilState(
    selectedAllCartItemSelector,
  );
  const handleSelectedAll = () => {
    setSelectedAll((isSelectedAll) => !isSelectedAll);
  };

  return (
    <Styled.ItemList>
      <Styled.TotalSelect>
        <Styled.Button onClick={handleSelectedAll}>
          <img
            src={selectedAll ? CheckedBox : UnCheckedBox}
            alt={selectedAll ? '전체 선택' : '전체 선택 해제'}
          />
        </Styled.Button>
        <div>전체 선택</div>
      </Styled.TotalSelect>
      {cartItems.map((cartItem: CartItemType) => {
        return (
          <CartItem
            key={cartItem.id}
            id={cartItem.id}
            cartItemProduct={cartItem.product}
            readonly={false}
          />
        );
      })}
    </Styled.ItemList>
  );
};

export default CartItemList;
