import styled from 'styled-components';
import { Layout } from '../layout';
import { ProductSelectSection } from '../components/cart/productList/ProductListSection';
import { OrderSummarySection } from '../components/cart/orderSummarySection/OrderSummarySection';
import { selector, useRecoilValue } from 'recoil';
import { cartIdListState } from '../atoms/cartIdListAtom';

const cartIdListLengthState = selector({
  key: 'cartIdListLengthState',
  get: ({ get }) => {
    const cartIdList = get(cartIdListState);

    return cartIdList.length;
  },
});

export const Cart = () => {
  const cartIdListLength = useRecoilValue(cartIdListLengthState);

  return (
    <Layout>
      <Style.Header>
        <Style.HeaderTitle>장바구니</Style.HeaderTitle>
      </Style.Header>

      {cartIdListLength > 0 ? (
        <Style.Content>
          <ProductSelectSection />
          <OrderSummarySection />
        </Style.Content>
      ) : (
        <Style.EmptyCartContainer>
          장바구니가 비어있습니다!
        </Style.EmptyCartContainer>
      )}
    </Layout>
  );
};

const Style = {
  Header: styled.div`
    width: 1320px;
    height: 67px;

    display: flex;
    justify-content: center;

    border-bottom: 4px solid #333333;
    margin-bottom: 34px;
  `,
  HeaderTitle: styled.h1`
    padding: 0;
    margin: 0;

    font-size: 32px;
  `,
  Content: styled.div`
    width: 1320px;
    height: max-content;

    display: flex;
    gap: 104px;
  `,
  EmptyCartContainer: styled.div`
    width: 1320px;
    min-height: 50vh;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 50px;
  `,
};
