import { Content as StyledContent } from '../style';

import OrderConfirmationTitleContainer from '../../TitleContainer/OrderConfirmationTitleContainer';
import OrderConfirmationCartItems from '../../CartItems/OrderConfirmationCartItems/OrderConfirmationCartItems';
import ApplyingCouponButton from '../../ApplyingCouponButton/ApplyingCouponButton';
import ShippingInfo from '../../ShippingInfo/ShippingInfo';
import OrderConfirmationTotalPaymentInfo from '../../TotalPaymentInfo/OrderConfirmationTotalPaymentInfo';

const OrderConfirmationContent = () => {
  return (
    <StyledContent>
      <>
        <OrderConfirmationTitleContainer />
        <OrderConfirmationCartItems />
        <ApplyingCouponButton />
        <ShippingInfo />
        <OrderConfirmationTotalPaymentInfo />
      </>
    </StyledContent>
  );
};

export default OrderConfirmationContent;
