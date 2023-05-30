import { styled } from 'styled-components';
import CartListItem from '../../cart/CartListItem/CartListItem';
import Spacer from '../../common/Spacer/Spacer';
import CartTotal from '../../cart/CartTotal/CartTotal';
import Checkbox from '../../common/Checkbox/Checkbox';
import useCartPage from './useCartPage';

const CartPage = () => {
  const {
    cart,
    checkedItemIds,
    isAllChecked,
    calcTotalPrice,
    handleCheckboxChange,
    handleAllCheckboxChange,
    handleSelectedItemDelete,
  } = useCartPage();

  return (
    <Container>
      <TitleWrapper>
        <Title>장바구니</Title>
      </TitleWrapper>
      <Spacer height={34} />
      <Inner>
        <CartList>
          <AllCheckBoxContainer>
            <Checkbox
              checked={isAllChecked}
              onChange={handleAllCheckboxChange}
            />
            <Spacer width={15} />
            <span>
              전체선택 ({checkedItemIds.size} / {cart.length})
            </span>
            <DeleteButton
              disabled={checkedItemIds.size === 0}
              onClick={handleSelectedItemDelete}
            >
              선택삭제
            </DeleteButton>
          </AllCheckBoxContainer>
          {cart.map((cartItem) => (
            <CartListItem
              key={cartItem.id}
              cartItem={cartItem}
              checked={checkedItemIds.has(cartItem.id)}
              onChangeCheckbox={handleCheckboxChange}
            />
          ))}
          <Spacer height={20} />
        </CartList>
        <TotalWrapper>
          <CartTotal totalProductPrice={calcTotalPrice()} />
        </TotalWrapper>
      </Inner>
    </Container>
  );
};

const Container = styled.div``;

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

  @media only screen and (max-width: 768px) {
    width: 600px;
  }

  @media only screen and (max-width: 600px) {
    width: 400px;
  }
`;

const Inner = styled.div`
  display: flex;
  column-gap: 104px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AllCheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  border-bottom: 4px solid #aaaaaa;

  & > span {
    font-size: 18px;
  }
`;

const DeleteButton = styled.button`
  width: 98px;
  height: 35px;
  margin-left: auto;
  font-family: 'Noto Sans KR';
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #333;
  border: 1px solid #bbb;

  &:disabled {
    color: #bbb;
  }
`;

const TotalWrapper = styled.div`
  position: relative;
  padding-top: 54px;
`;

export default CartPage;
