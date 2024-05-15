import { CartItem } from '../../type';
import Item from './Item';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';
import { useRecoilState } from 'recoil';
import { SelectedAllCardItemsSelector } from '../../recoil/atoms';

interface ItemList {
  cartItems: CartItem[];
  onRemoveItem: (cartItemId: number) => void;
  onAdjustItemQuantity: (cartItemId: number, quantity: number) => void;
}

const ItemList = ({
  cartItems,
  onRemoveItem,
  onAdjustItemQuantity,
}: ItemList) => {
  const cartItemIds = cartItems.map((cartItem) => cartItem.id);
  const [selectedAll, setSelectedAll] = useRecoilState(
    SelectedAllCardItemsSelector(cartItemIds),
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
      {cartItems.map((cartItem: CartItem) => {
        return (
          <li key={cartItem.id}>
            <Item
              cartItem={cartItem}
              onRemoveItem={() => onRemoveItem(cartItem.id)}
              onAdjustItemQuantity={onAdjustItemQuantity}
            ></Item>
          </li>
        );
      })}
    </Styled.ItemList>
  );
};

export default ItemList;
