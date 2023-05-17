import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import CartItem from './CartItem';
import CheckBox from '../leafs/CheckBox';
import { cartState } from '../../recoil/state';

export default function CartItemList() {
  const [cart, setCart] = useRecoilState(cartState);
  const [checkedList, setCheckedList] = useState<boolean[]>(Array(cart.length).fill(true));

  const checkedCount = checkedList.filter((checked) => checked).length;
  const allChecked = checkedCount === cart.length;

  const checkAll = () => {
    setCheckedList(Array(cart.length).fill(true));
  };

  const uncheckAll = () => {
    setCheckedList(Array(cart.length).fill(false));
  };

  const toggleChecked = (index: number) => () => {
    setCheckedList(checkedList.toSpliced(index, 1, !checkedList[index]));
  };

  const removeChecked = () => {
    setCart(cart.filter((_, index) => checkedList[index] === false));
    setCheckedList(checkedList.filter((checked) => checked === false));
  };

  return (
    <Wrapper>
      <List>
        {cart.map((cartItem, index) => (
          <ListItemBox key={cartItem.id}>
            <CartItem
              {...cartItem}
              checked={checkedList[index]}
              toggleChecked={toggleChecked(index)}
            />
          </ListItemBox>
        ))}
      </List>
      <RemoveBox>
        <CheckBox checked={allChecked} onClickCheckbox={allChecked ? uncheckAll : checkAll} />
        <RemoveLabel>
          전체선택 ({checkedCount}/{cart.length})
        </RemoveLabel>
        <RemoveButton onClick={removeChecked}>선택삭제</RemoveButton>
      </RemoveBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 736px;

  @media (max-width: 736px) {
    width: 100%;
  }
`;

const List = styled.div`
  min-height: 128px;
  max-height: 600px;
  border-top: 4px solid #aaaaaa;

  overflow: scroll;
`;

const ListItemBox = styled.div`
  padding: 28px 0;

  & + & {
    border-top: 1.5px solid #cccccc;
  }
`;

const RemoveBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: 8px;
`;

const RemoveLabel = styled.p`
  margin: 0 16px;

  line-height: 20px;
  letter-spacing: 0.5px;
  font-size: 16px;
  color: #333333;
`;

const RemoveButton = styled.button`
  width: 98px;
  height: 36px;

  border: 1px solid #bbbbbb;
  background: #ffffff;

  font-size: 16px;
  color: #333333;
`;
