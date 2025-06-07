import { useNavigate } from 'react-router-dom';
import AllCheckSection from '../components/AllCheckSection';
import CartItemCountMessage from '../components/CartItemCountMessage';
import ConfirmButton from '../components/ConfirmButton';
import ItemCard from '../components/ItemCard';
import NoCartItems from '../components/NoCartItems';
import PriceSection from '../components/priceSection/PriceSection';
import { DELIVERY_PRICE_THRESHOLD } from '../constants/config';
import { useCartItemsContext } from '../contexts/CartItemsContext';
import styled from '@emotion/styled';
import { BASE_URL, URL_LOCATION } from '../constants/url';

const CartPage = () => {
  const { cartItems, checkedCartIds } = useCartItemsContext();
  const navigate = useNavigate();

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
                총 주문 금액이 {DELIVERY_PRICE_THRESHOLD.toLocaleString()} 이상인 경우 무료
                배송됩니다.
              </p>
            </S.infoContainer>
            <PriceSection />
          </>
        )}
      </S.content>
      <ConfirmButton
        title="주문 확인"
        onClick={() =>
          navigate(BASE_URL + URL_LOCATION.ORDER, {
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
