import styled from '@emotion/styled';
import BottomButton from '../components/BottomButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { BASE_URL, URL_LOCATION } from '../constants/url';

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
        <S.middleContainer>
          <p>
            총 {checkedCartIds.length}종류의 상품 {totalQuantity}개를 주문합니다.
          </p>
          <p>최종 결제 금액을 확인해 주세요.</p>
        </S.middleContainer>
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
  content: styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 24px;
    height: calc(100vh - 64px - 64px);
  `,

  title: styled.p`
    font-size: 24px;
    font-weight: 700;
  `,

  middleContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,

  bottomContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  `,

  totalPriceText: styled.p`
    font-size: 16px;
    font-weight: 700;
  `,

  totalPrice: styled.p`
    font-size: 24px;
    font-weight: 700;
  `,
};
