import { styled } from 'styled-components';
import CartListItem from '../../cart/CartListItem/CartListItem';
import Spacer from '../../common/Spacer/Spacer';
import CartTotal from '../../cart/CartTotal/CartTotal';
import Checkbox from '../../common/Checkbox/Checkbox';
import useCartPage from './useCartPage';
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary';
import ErrorPage from '../ErrorPage/ErrorPage';

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
    <ErrorBoundary errorFallback={({ error }) => <ErrorPage error={error} />}>
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
                checked={checkedItemIds.has(cartItem.id)}
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
                전체선택 ({checkedItemIds.size} / {cart.length})
              </span>
              <DeleteButton
                disabled={checkedItemIds.size === 0}
                onClick={handleSelectedItemDelete}
              >
                선택삭제
              </DeleteButton>
            </AllCheckBoxContainer>
          </CartList>
          <TotalWrapper>
            <CartTotal totalProductPrice={calcTotalPrice()} />
          </TotalWrapper>
        </Inner>
      </div>
    </ErrorBoundary>
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
