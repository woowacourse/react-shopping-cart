import styled from '@emotion/styled';
import BottomButton from '../components/BottomButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { BASE_URL, URL_LOCATION } from '../constants/url';
import OrderPageMessage from '../components/OrderPageMessage';
import DeliverySection from '../components/DeliverySection';
import { DELIVERY_PRICE_THRESHOLD } from '../constants/config';
import PriceSection from '../components/priceSection/PriceSection';
import ItemInfoCard from '../components/ItemInfoCard';

const OrderPage = () => {
  const { state } = useLocation();
  const { cartItems, checkedCartIds }: { cartItems: CartItem[]; checkedCartIds: number[] } = state;
  const checkedSet = new Set(checkedCartIds);
  const totalQuantity = cartItems.reduce(
    (acc, item) => (checkedSet.has(item.id) ? acc + item.quantity : acc),
    0
  );
  const navigate = useNavigate();

  return (
    <>
      <S.content data-testid="orderPage">
        <S.title>주문 확인</S.title>
        <>
          <OrderPageMessage cartLength={checkedCartIds.length} totalQuantity={totalQuantity} />
          <S.itemCardList>
            {cartItems.map((item) => (
              <ItemInfoCard key={item.id} product={item.product} quantity={item.quantity} />
            ))}
          </S.itemCardList>
          <S.CouponButton>쿠폰 적용</S.CouponButton>
          <DeliverySection />
          <S.infoContainer>
            <img src="./info.svg" />
            <p>
              총 주문 금액이 {DELIVERY_PRICE_THRESHOLD.toLocaleString()}원 이상인 경우 무료
              배송됩니다.
            </p>
          </S.infoContainer>
          <PriceSection showDiscount={true} />
        </>
      </S.content>
      <BottomButton
        title="결제하기"
        onClick={() =>
          navigate(BASE_URL + URL_LOCATION.CONFIRM, {
            state: {
              cartItems,
              checkedCartIds,
            },
          })
        }
      />
    </>
  );
};

export default OrderPage;

const S = {
  title: styled.p`
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
  `,

  content: styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px - 64px);
  `,

  itemCardList: styled.ul`
    overflow-y: auto;
  `,

  CouponButton: styled.button`
    padding: 8px;
    border-radius: 5px;
    border: 1px solid rgba(51, 51, 51, 0.25);
    color: rgba(51, 51, 51, 0.75);
    text-align: center;
    font-size: 15px;
    font-weight: 700;
  `,

  infoContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 0px;
    border-bottom: 2px solid #e6e6e6;
  `,
};
