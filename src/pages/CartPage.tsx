import AllCheckSection from '../components/AllCheckSection';
import CartItemCountMessage from '../components/CartItemCountMessage';
import ConfirmButton from '../components/ConfirmButton';
import ItemCard from '../components/ItemCard';
import NoCartItems from '../components/NoCartItems';
import PriceSection from '../components/priceSection/PriceSection';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import { usePageContext } from '../contexts/PageContext';
import styled from '@emotion/styled';

const CartPage = () => {
  const { cartItems } = useCartItemsContext();
  const { setPage } = usePageContext();

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
                  id={item.id}
                  product={item.product}
                  quantity={item.quantity}
                  key={item.id}
                />
              ))}
            </S.itemCardList>
            <S.infoContainer>
              <img src="/info.svg" />
              <p>총 주문 금액이 100,000 이상인 경우 무료 배송됩니다.</p>
            </S.infoContainer>
            <PriceSection />
          </>
        )}
      </S.content>
      <ConfirmButton
        title="주문 확인"
        onClick={() => setPage('orderConfirm')}
      />
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
    padding-bottom: 12px;
    border-bottom: 2px solid #e6e6e6;
  `,
};
