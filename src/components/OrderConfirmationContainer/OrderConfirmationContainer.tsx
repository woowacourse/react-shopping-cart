import { useRecoilValue } from 'recoil';
import Title from '../common/Title/Title';
import TotalPaymentInfo from '../common/TotalPaymentInfo/TotalPaymentInfo';
import * as Styled from './style';
import { selectedSomeCartItemsSelector } from '../../recoil/selectedCardItems';
import OrderButton from '../common/OrderButton/OrderButton';
import { useNavigate } from 'react-router-dom';
import { fetchedCartItemsSelector } from '../../recoil/fetch';
import { ROUTE } from '../../constant/route';
import PaymentInfo from '../common/TotalPaymentInfo/PaymentInfo';
import ReadOnlyCartItemList from '../CartItemList/ReadOnlyCartItemList';
import CouponApplication from '../CouponApplication/CouponApplication';

const OrderConfirmationContainer = () => {
  const navigator = useNavigate();
  const cartItems = useRecoilValue(fetchedCartItemsSelector);

  const hasSomeCartItem = !!cartItems.length;
  const isSomeCartItemSelected = useRecoilValue(selectedSomeCartItemsSelector);
  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

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
        <TotalPaymentInfo>
          {<PaymentInfo label="쿠폰 할인 금액" price={'-2000원'} />}
        </TotalPaymentInfo>
      </Styled.Container>

      <OrderButton
        onClick={() => {
          navigator(ROUTE.buyItem.path);
        }}
        isOrderable={isOrderable}
      >
        결제하기
      </OrderButton>
    </>
  );
};

export default OrderConfirmationContainer;
