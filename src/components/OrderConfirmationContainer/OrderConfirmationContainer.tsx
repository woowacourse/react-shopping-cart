import Title from '../common/Title/Title';
import TotalPaymentInfo from '../common/TotalPaymentInfo/TotalPaymentInfo';
import * as Styled from './style';
import OrderButton from '../common/OrderButton/OrderButton';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../constant/route';
import PaymentInfo from '../common/TotalPaymentInfo/PaymentInfo';
import ReadOnlyCartItemList from '../CartItemList/ReadOnlyCartItemList';
import CouponApplication from '../CouponApplication/CouponApplication';
import { useRecoilValue } from 'recoil';
import { finalCouponDiscountSelector } from '../../recoil/coupons';
import { koMoneyFormat } from '../util/koMoneyFormat';
import DeliveryInfo from '../DeliveryInfo/DeliveryInfo';

const OrderConfirmationContainer = () => {
  const navigator = useNavigate();
  const finalCouponDiscount = useRecoilValue(finalCouponDiscountSelector);

  return (
    <>
      <Styled.Container>
        <Title
          title="주문 확인"
          caption={`총 1종류의 상품 2개를 주문합니다.\n
              최종 결제 금액을 확인해 주세요.`}
        />
        <ReadOnlyCartItemList />
        <CouponApplication />
        <DeliveryInfo />
        <TotalPaymentInfo>
          {
            <PaymentInfo
              label="쿠폰 할인 금액"
              price={`${finalCouponDiscount === 0 ? '' : '-'}${koMoneyFormat(finalCouponDiscount)}`}
            />
          }
        </TotalPaymentInfo>
      </Styled.Container>
      <OrderButton
        onClick={() => {
          navigator(ROUTE.buyItem.path);
        }}
        isOrderable={true}
      >
        결제하기
      </OrderButton>
    </>
  );
};

export default OrderConfirmationContainer;
