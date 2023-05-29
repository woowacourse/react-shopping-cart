import { StyledCartPage, StyledFlexBox } from './CartPage.styled';
import CartListSection from '@pages/CartPage/CartListSection/CartListSection';
import * as Text from '@commons/Text/Text';
import PaymentSection from './PaymentSection/PaymentSection';

const CartPage = () => {
  return (
    <StyledCartPage>
      <Text.Title>장바구니</Text.Title>
      <StyledFlexBox>
        <CartListSection />
        <PaymentSection />
      </StyledFlexBox>
    </StyledCartPage>
  );
};

export default CartPage;
