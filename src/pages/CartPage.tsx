import styled from 'styled-components';
import CartList from '../components/CartList';
import CartPrice from '../components/CartPrice';
import { useRecoilValue } from 'recoil';
import { totalAmountState } from '../atoms/cart';
import EmptyPage from './EmptyPage';

const CartPage = () => {
  const { totalItems } = useRecoilValue(totalAmountState);

  return (
    <StyledCartWrapper>
      <StyledTitle>장바구니</StyledTitle>
      {totalItems > 0 ? (
        <>
          <StyledSubTitle>든든배송 상품({totalItems}개)</StyledSubTitle>
          <StyledBody>
            <CartList />
            <CartPrice />
          </StyledBody>
        </>
      ) : (
        <EmptyPage message="장바구니에 담긴 상품이 없습니다." />
      )}
    </StyledCartWrapper>
  );
};

export default CartPage;

const StyledCartWrapper = styled.div`
  margin: 50px 12%;
`;

const StyledTitle = styled.div`
  font-size: 32px;
  font-weight: 500;
  padding-bottom: 30px;
  width: 100%;
  border-bottom: 4px solid #333333;
  text-align: center;
`;

const StyledSubTitle = styled.div`
  margin-top: 35px;
  font-size: 20px;
`;

const StyledBody = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 32px;
`;
