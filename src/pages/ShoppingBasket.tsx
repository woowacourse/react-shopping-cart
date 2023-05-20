import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import ContentLayout from 'src/components/@common/ContentLayout';
import CartList from 'src/components/Cart/CartList';
import OrderInfo from 'src/components/Cart/OrderInfo';
import Header from 'src/components/Header';
import { useGetFetch } from 'src/hooks/useFetch';
import useToast from 'src/hooks/useToast';
import { cartListAtom } from 'src/recoil/cartList';
import { CartItem } from 'src/types';
import { styled } from 'styled-components';

const ShoppingBasket = () => {
  const { toast } = useToast();
  const { data, error, loading } = useGetFetch<CartItem[]>(
    '/api/cart-items',
    []
  );
  const setCartItem = useSetRecoilState(cartListAtom); // 로그인 했을 경우에는 데이터를 받아오고, 그게 아닌 경우에는 로컬스토리지로 저장할 것.

  useEffect(() => {
    if (loading) return;
    if (error.isError) {
      toast.error(error.message);
    }
    setCartItem(data);
  }, [loading]);

  return (
    <>
      <Header />
      <ContentLayout>
        <BasketTitle>장바구니</BasketTitle>
        <BasketContent>
          <CartList />
          <OrderInfoWrapper>
            <OrderInfo />
          </OrderInfoWrapper>
        </BasketContent>
      </ContentLayout>
    </>
  );
};

export default ShoppingBasket;

const BasketTitle = styled.div`
  text-align: center;
  font: ${(props) => props.theme.font.title};
  padding-bottom: 30px;
  border-bottom: 4px solid #333333;

  margin: 0 60px 30px 60px;

  @media (min-width: 320px) and (max-width: 1116px) {
    margin: 0 20px 30px 20px;
  }
`;

const BasketContent = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  margin: 0 60px;

  @media (min-width: 320px) and (max-width: 1116px) {
    flex-direction: column;
    margin: 0 20px;
  }
`;

console.log(screen.width, '2');

const OrderInfoWrapper = styled.div`
  position: fixed;

  right: 60px;

  @media (min-width: 320px) and (max-width: 1116px) {
    position: unset;
    display: flex;
    justify-content: center;
  }
`;
