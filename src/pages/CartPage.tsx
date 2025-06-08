import AllCheckSection from '../components/AllCheckSection';
import CartItemCountMessage from '../components/messages/CartItemCountMessage';
import ConfirmButton from '../components/buttons/ConfirmButton';
import ItemCard from '../components/itemCards/ItemCard';
import NoCartItems from '../components/NoCartItems';
import PriceSection from '../components/priceSection/PriceSection';
import { DELIVERY_PRICE_THRESHOLD } from '../constants/config';
import { useCartItemsContext } from '../contexts/CartItems/CartItemsContext';
import { usePageContext } from '../contexts/Page/PageContext';
import S from './page.Style';
import InlineNotice from '../components/InlineNotice';

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
            <InlineNotice
              text={`총 주문 금액이 ${DELIVERY_PRICE_THRESHOLD.toLocaleString()}
                이상인 경우 무료 배송됩니다.`}
            />

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
