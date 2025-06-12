import AllCheckSection from '../components/AllCheckSection';
import CartItemCountMessage from '../components/CartItemCountMessage';
import ConfirmButton from '../components/ConfirmButton';
import ItemCard from '../components/ItemCard';
import NoCartItems from '../components/NoCartItems';
import PriceSection from '../components/priceSection/PriceSection';
import { DELIVERY_PRICE_THRESHOLD } from '../constants/config';
import styled from '@emotion/styled';
import useCartPage from '../hooks/useCartPage';

const CartPage = () => {
  const { cartItems, orderPrice, deliveryPrice, handleBottomButton } = useCartPage();

  return (
    <>
      <S.content>
        <S.title>장바구니</S.title>
        {cartItems.length === 0 ? (
          <NoCartItems />
        ) : (
          <>
            <CartItemCountMessage />
            <AllCheckSection />
            <S.itemCardList>
              {cartItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  product={item.product}
                  quantity={item.quantity}
                />
              ))}
            </S.itemCardList>
            <S.infoContainer>
              <img src="./info.svg" />
              <p>
                총 주문 금액이 {DELIVERY_PRICE_THRESHOLD.toLocaleString()}원 이상인 경우 무료
                배송됩니다.
              </p>
            </S.infoContainer>
            <PriceSection orderPrice={orderPrice} deliveryPrice={deliveryPrice} />
          </>
        )}
      </S.content>
      <ConfirmButton title="주문 확인" onClick={handleBottomButton} />
    </>
  );
};

export default CartPage;

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

  infoContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 0px;
    border-bottom: 2px solid #e6e6e6;
  `,
};
