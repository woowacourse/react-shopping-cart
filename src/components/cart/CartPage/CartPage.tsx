import { useState } from 'react';
import { styled } from 'styled-components';
import CartListItem from '../CartListItem/CartListItem';
import Spacer from '../../common/Spacer/Spacer';
import CartTotal from '../CartTotal/CartTotal';
import Checkbox from '../../common/Checkbox/Checkbox';
import useCartService from '../../../hooks/useCartService';

const CartPage = () => {
  const { cart } = useCartService();
  const [checkedItemIds, setCheckedItemIds] = useState(
    cart.map((cartItem) => cartItem.id),
  );
  const isAllChecked = checkedItemIds.length === cart.length;

  const calcTotalPrice = () => {
    const checkedItems = cart.filter((cartItem) =>
      checkedItemIds.includes(cartItem.id),
    );

    return checkedItems.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      0,
    );
  };

  const handleCheckboxChange = (clickedItemId: string) => {
    if (checkedItemIds.includes(clickedItemId)) {
      setCheckedItemIds((prev) => prev.filter((id) => id !== clickedItemId));
    } else {
      setCheckedItemIds((prev) => [...prev, clickedItemId]);
    }
  };

  const handleAllCheckboxChange = () => {
    if (isAllChecked) {
      setCheckedItemIds(() => []);
    } else {
      setCheckedItemIds(() => cart.map((cartItem) => cartItem.id));
    }
  };

  return (
    <div>
      <TitleWrapper>
        <Title>장바구니</Title>
      </TitleWrapper>
      <Spacer height={34} />
      <Inner>
        <CartList>
          <ListTitle>든든배송 상품 ({cart.length}개)</ListTitle>
          {cart.map((cartItem) => (
            <CartListItem
              key={cartItem.id}
              cartItem={cartItem}
              checked={checkedItemIds.includes(cartItem.id)}
              onChange={handleCheckboxChange}
            />
          ))}
          <Spacer height={20} />
          <AllCheckBoxContainer>
            <Checkbox
              checked={isAllChecked}
              onChange={handleAllCheckboxChange}
            />
            <span>
              전체선택 ({checkedItemIds.length} / {cart.length})
            </span>
            <DeleteButton>선택삭제</DeleteButton>
          </AllCheckBoxContainer>
        </CartList>
        <TotalWrapper>
          <CartTotal totalProductPrice={calcTotalPrice()} />
        </TotalWrapper>
      </Inner>
    </div>
  );
};

const TitleWrapper = styled.div`
  height: 67px;
  border-bottom: 4px solid #333;
`;

const Title = styled.h2`
  font-family: 'Noto Sans KR';
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #333;
`;

const CartList = styled.ul`
  width: 735px;

  & > li {
    border-bottom: 1.5px solid #ccc;
  }

  & > li:last-child {
    border: none;
  }
`;

const ListTitle = styled.div`
  height: 56px;
  border-bottom: 4px solid #aaaaaa;
  font-family: 'Noto Sans KR';
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: #333;
`;

const Inner = styled.div`
  display: flex;
  column-gap: 104px;
`;

const AllCheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const DeleteButton = styled.button`
  width: 98px;
  height: 35px;
  font-family: 'Noto Sans KR';
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #333;
  border: 1px solid #bbb;
`;

const TotalWrapper = styled.div`
  padding-top: 50px;
`;

export default CartPage;
