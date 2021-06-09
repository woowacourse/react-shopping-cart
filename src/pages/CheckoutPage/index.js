import { useCart, useOrder } from '../../hooks';
import { Header, RedirectNotice } from '../../components';
import { Item } from './Item';
import * as S from './style.js';
import { ROUTE } from '../../constants';

const API_OPTIONS = { quantity: 1 };

export const CheckoutPage = () => {
  const { selectedProducts: productsToOrder, totalPrice } = useCart();
  const { checkout, isError } = useOrder();

  const onClickCheckoutButton = () => {
    const orders = productsToOrder
      .map((product) => product.cartIds.map((cartId) => ({ cartId, ...API_OPTIONS })))
      .flat();

    checkout(orders);
  };

  return (
    <S.Page>
      <Header>주문/결제</Header>
      <S.Main>
        {!productsToOrder || isError ? (
          <RedirectNotice
            interjection="앗..."
            notice={`결제에 실패하였습니다... 문제가 지속되면 관리자에게 문의부탁드려요...`}
            buttonText="장바구니로 돌아가기"
            redirectRoute={ROUTE.CART}
          />
        ) : (
          <>
            <S.ListSection>
              <S.ListLabel>주문 상품 ({productsToOrder.length}건)</S.ListLabel>
              <S.CheckoutProductList>
                {productsToOrder.map((product) => (
                  <Item key={product.productId} product={product} />
                ))}
              </S.CheckoutProductList>
            </S.ListSection>
            <S.CheckoutSection>
              <S.StickyCheckoutBox
                title="결제예상금액"
                label="총 결제금액"
                price={totalPrice}
                buttonText={`${totalPrice} 결제하기`}
                onClickButton={onClickCheckoutButton}
              />
            </S.CheckoutSection>
          </>
        )}
      </S.Main>
    </S.Page>
  );
};
