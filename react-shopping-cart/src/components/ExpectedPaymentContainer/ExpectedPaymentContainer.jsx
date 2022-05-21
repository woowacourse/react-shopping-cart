import { useSelector } from 'react-redux';
import styled from 'styled-components';

import FlexWrapper from 'components/@shared/FlexWrapper/FlexWrapper';

import ExpectedPaymentAmount from 'components/ExpectedPaymentAmount/ExpectedPaymentAmount';
import OrderButton from 'components/OrderButton/OrderButton';

import { selectCurrentCarts } from 'redux/carts/carts.selector';

import { CURRENT_USER } from 'constants';

//재사용X
function ExpectedPaymentContainer() {
  const carts = useSelector(selectCurrentCarts);

  const totalPaymentCost = carts.reduce((acc, cart) => {
    if (cart.user === CURRENT_USER && cart.checked) {
      return acc + Number(cart.price) * Number(cart.quantity);
    }
    return acc;
  }, 0);

  const totalOrderProductsQuantity = carts.reduce((acc, cart) => {
    if (cart.user === CURRENT_USER && cart.checked) {
      return acc + Number(cart.quantity);
    }
    return acc;
  }, 0);

  return (
    <Styled.Root>
      <Styled.TopWrapper>결제예상금액</Styled.TopWrapper>
      <FlexWrapper
        flexDirection="column"
        gap="42px"
        padding="20px"
        width="100%"
      >
        <ExpectedPaymentAmount price={totalPaymentCost} />
        <OrderButton>{`주문하기(${totalOrderProductsQuantity}개)`}</OrderButton>
      </FlexWrapper>
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray_04};
  `,

  TopWrapper: styled.div`
    padding: 20px;
    font-size: 16px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_04};
  `,
};

export default ExpectedPaymentContainer;
