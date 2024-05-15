import { CartItem } from '../../type';
import Item from './Item';
import * as Styled from './style';
import CheckedBox from '../assets/CheckedBox.svg';
import UnCheckedBox from '../assets/UnCheckedBox.svg';

interface ItemList {
  cartItems: CartItem[];
}

const ItemList = ({ cartItems }: ItemList) => {
  return (
    <Styled.ItemList>
      <Styled.TotalSelect>
        <Styled.Button>
          <img
            src={true ? CheckedBox : UnCheckedBox}
            alt={true ? '전체 선택' : '전체 선택 해제'}
          />
        </Styled.Button>
        <div>전체 선택</div>
      </Styled.TotalSelect>
      {cartItems.map((cartItem: CartItem) => {
        return (
          <li key={cartItem.id}>
            <Item cartItem={cartItem}></Item>
          </li>
        );
      })}
    </Styled.ItemList>
  );
};

export default ItemList;
