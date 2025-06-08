import ConfirmButton from '../components/buttons/ConfirmButton';
import PriceSection from '../components/priceSection/PriceSection';
import { DELIVERY_PRICE_THRESHOLD } from '../constants/config';
import { useCartItemsContext } from '../contexts/CartItems/CartItemsContext';
import { usePageContext } from '../contexts/Page/PageContext';
import BaseS from './page.Style';
import CartItemConfirmMessage from '../components/messages/CartItemConfirmMessage';
import { useCheckCartIdsContext } from '../contexts/CheckedCartIds/CheckedCartIdsContext';
import ConfirmItemCard from '../components/itemCards/ConfirmItemCard';
import OpenCouponModalButton from '../components/buttons/OpenCouponModalButton';
import styled from '@emotion/styled';

const OrderConfirmPage = () => {
  const { cartItems } = useCartItemsContext();
  const { checkedCartIds } = useCheckCartIdsContext();
  const { setPage } = usePageContext();

  const selectedCartItems = cartItems.filter((item) =>
    checkedCartIds.includes(item.id)
  );

  return (
    <>
      <S.content>
        <S.title>주문 확인</S.title>

        <CartItemConfirmMessage />
        <S.itemCardList>
          {selectedCartItems.map((item) => (
            <ConfirmItemCard
              product={item.product}
              quantity={item.quantity}
              key={item.id}
            />
          ))}
        </S.itemCardList>
        <OpenCouponModalButton />
        <S.infoContainer>
          <img src="./info.svg" />
          <p>
            총 주문 금액이 {DELIVERY_PRICE_THRESHOLD.toLocaleString()} 이상인
            경우 무료 배송됩니다.
          </p>
        </S.infoContainer>
        <PriceSection />
      </S.content>
      <ConfirmButton
        title="결제하기"
        onClick={() => setPage('orderPriceConfirm')}
      />
    </>
  );
};

const S = {
  ...BaseS,
  content: styled(BaseS.content)`
    gap: 12px;
  `,
};

export default OrderConfirmPage;
