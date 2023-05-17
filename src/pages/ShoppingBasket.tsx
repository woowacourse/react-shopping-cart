import ContentLayout from 'src/components/@common/ContentLayout';
import CartList from 'src/components/Cart/CartList';
import OrderInfo from 'src/components/Cart/OrderInfo';
import Header from 'src/components/Header';
import { useGetFetch } from 'src/hooks/useFetch';
import { CartItem } from 'src/types';
import { styled } from 'styled-components';

const ShoppingBasket = () => {
  const { data } = useGetFetch<CartItem[]>('/api/cart-items', []);

  return (
    <>
      <Header />
      <ContentLayout>
        <BasketWrapper>
          <BasketTitle>장바구니</BasketTitle>
          <BasketContent>
            <CartList cartList={data} />
            <OrderInfo />
          </BasketContent>
        </BasketWrapper>
      </ContentLayout>
    </>
  );
};

export default ShoppingBasket;

const BasketWrapper = styled.div`
  width: 1320px;
  margin: 0 auto;
`;

const BasketTitle = styled.div`
  text-align: center;
  font: ${(props) => props.theme.font.title};
  padding-bottom: 30px;
  border-bottom: 4px solid #333333;
`;

const BasketContent = styled.div`
  display: flex;
`;
