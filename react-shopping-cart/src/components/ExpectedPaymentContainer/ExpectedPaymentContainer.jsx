import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ExpectedPaymentBottomContainer from 'components/ExpectedPaymentBottomContainer/ExpectedPaymentBottomContainer';
import ExpectedPaymentBox from 'components/ExpectedPaymentBox/ExpectedPaymentBox';
import ExpectedPaymentTopContainer from 'components/ExpectedPaymentTopContainer/ExpectedPaymentTopContainer';
import OrderButton from 'components/OrderButton/OrderButton';

import { selectCurrentCarts } from 'redux/carts/carts.selector';

import { CURRENT_USER } from 'constants';

//재사용X
//TODO: 불필요하게 나눠진 컴포넌트 삭제 및 합체
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
      {/* THINK: Top, Bottom Container가 단순히 style만 있는 컴포넌트이다. 이 부분은 여기서 선언해서 사용해도 되지 않을까? */}
      <ExpectedPaymentTopContainer>결제예상금액</ExpectedPaymentTopContainer>
      <ExpectedPaymentBottomContainer>
        <ExpectedPaymentBox price={totalPaymentCost} />
        <OrderButton>{`주문하기(${totalOrderProductsQuantity}개)`}</OrderButton>
      </ExpectedPaymentBottomContainer>
    </Styled.Root>
  );
}

const Styled = {
  Root: styled.div`
    border: 1px solid ${({ theme }) => theme.colors.gray_04};
  `,
};

export default ExpectedPaymentContainer;
