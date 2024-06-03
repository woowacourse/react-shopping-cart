import Title from '../common/Title/Title';
import TotalPaymentInfo from '../common/TotalPaymentInfo/TotalPaymentInfo';
import * as Styled from './style';
import OrderButton from '../common/OrderButton/OrderButton';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../constants/route';
import PaymentInfo from '../common/TotalPaymentInfo/PaymentInfo';
import ReadOnlyCartItemList from '../CartItemList/ReadOnlyCartItemList';
import CouponApplicationModal from '../CouponApplicationModal/CouponApplicationModal';
import { useRecoilValue } from 'recoil';
import { koMoneyFormat } from '../../util/common/koMoneyFormat';
import DeliveryInfo from '../DeliveryInfo/DeliveryInfo';
import { selectedCartItemsSelector } from '../../recoil/cartItems';
import { orderCartItem } from '../../api/shoppingCart';
import useTotalDiscount from '../../hooks/useTotalDiscount';

const OrderConfirmationContainer = () => {
  const navigator = useNavigate();
  const finalCouponDiscount = useTotalDiscount();

  const orderCartItemIds = useRecoilValue(selectedCartItemsSelector).map(
    (orderCartItem) => orderCartItem.id,
  );

  return (
    <>
      <Styled.Container>
        <Title
          title="주문 확인"
          caption={`총 1종류의 상품 2개를 주문합니다.\n
              최종 결제 금액을 확인해 주세요.`}
        />
        <ReadOnlyCartItemList />
        <CouponApplicationModal />
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
          orderCartItem(orderCartItemIds);
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
