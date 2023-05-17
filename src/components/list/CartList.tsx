import styled from '@emotion/styled';
import { Text } from '../common/Text/Text';
import CartItem from '../box/CartItem';

const CartList = () => {
  return (
    <CartListWrapper>
      <Text size="smallest" weight="light" color="#333333">
        든든배송 상품 (3개)
      </Text>
      <CartItemListWrapper>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </CartItemListWrapper>
      <SelectAllWrapper>
        <CheckBox type="checkbox" />
        <Text size="minimum" weight="light" color="#333333">
          전체선택(2/3)
        </Text>
        <SelectDeleteButton>
          선택삭제
        </SelectDeleteButton>
      </SelectAllWrapper>
    </CartListWrapper>
  );
};

export default CartList;

const CartListWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 50%;

  margin-top: 30px;
`;

const CartItemListWrapper = styled.div`
  height: 580px;

  margin-top: 20px;
  border-top: 3px solid #aaaaaa;
  overflow-y: scroll;
`;

const SelectAllWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  padding: 20px 10px;
  width: 100%;
`;

const SelectDeleteButton = styled.button`
  width: 90px;
  height: 30px;

  border: 1px solid #bbbbbb;

  font-size: 15px;
  color: #333333;
  cursor: pointer;
`;

export const CheckBox = styled.input`
  width: 28px;
  height: 28px;

  cursor: pointer;
`;
