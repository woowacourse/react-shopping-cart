import styled from 'styled-components';

import Header from '../components/Common/Header';
import CartProductList from '../components/Cart/CartProductList';
import CheckBox from '../components/Common/CheckBox';
import Button from '../components/Common/Button';
import ExpectedPaymentBox from '../components/Cart/ExpectedPaymentBox';

const CartPage = () => {
  return (
    <>
      <Header />
      <Main>
        <PageTitle>장바구니</PageTitle>
        <CartProductInfo>
          <div>
            <InfoTitle>든든배송 상품 (3개)</InfoTitle>
            <CartProductList />
            <TotalCartProductWrapper>
              <CheckBox id='total-item-check' />
              <p>전체 선택 (2/3)</p>
              <Button type='button' primary={false} size='small' border>
                선택삭제
              </Button>
            </TotalCartProductWrapper>
          </div>
        </CartProductInfo>
        <ExpectedPaymentBoxWrapper>
          <ExpectedPaymentBox />
        </ExpectedPaymentBoxWrapper>
      </Main>
    </>
  );
};

const Main = styled.main`
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 1300px;
  height: calc(100vh - 80px);
  margin: 0 auto;
  padding: 0 30px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PageTitle = styled.h2`
  position: absolute;
  top: 0;
  left: 50%;
  width: calc(100% - 60px);
  height: 120px;
  padding: 48px 0 0 0;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  transform: translate(-50%, 0);
`;

const CartProductInfo = styled.section`
  max-width: 740px;
  padding: 120px 0 0 0;
  flex-grow: 1;

  & > div {
    display: flex;
    flex-direction: column;
  }
`;

const InfoTitle = styled.h3`
  height: 90px;
  line-height: 90px;
  font-size: 20px;
  font-weight: 400;
  border-bottom: 4px solid ${({ theme }) => theme.colors.gray400};
`;

const TotalCartProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 100px 0;
`;

const ExpectedPaymentBoxWrapper = styled.section`
  position: sticky;
  top: 90px;
  margin: 210px 0 0 0;
`;

export default CartPage;
