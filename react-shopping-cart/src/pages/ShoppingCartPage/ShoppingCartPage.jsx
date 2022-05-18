import styled from 'styled-components';

import CartLeftSection from 'components/CartLeftSection/CartLeftSection';
import ExpectedPaymentContainer from 'components/ExpectedPaymentContainer/ExpectedPaymentContainer';

import { ColumnFlexWrapper } from 'styles/Wrapper';

function ShoppingCartPage() {
  return (
    <ColumnFlexWrapper gap="30px">
      <Styled.ShoppingCartPageHeader>장바구니</Styled.ShoppingCartPageHeader>
      <Styled.ShoppingCartPageContent gap="60px">
        <CartLeftSection />
        <ExpectedPaymentContainer />
      </Styled.ShoppingCartPageContent>
    </ColumnFlexWrapper>
  );
}

const Styled = {
  ShoppingCartPageHeader: styled.div`
    width: 880px;
    padding: 20px 0;
    border-bottom: 3px solid ${({ theme }) => theme.colors.black_01};
    text-align: center;
    font-size: 22px;
    font-weight: 700;
  `,
  ShoppingCartPageContent: styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: ${({ gap }) => gap};
  `,
};

export default ShoppingCartPage;
