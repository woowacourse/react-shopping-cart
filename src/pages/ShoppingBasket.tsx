import { useRecoilValue } from 'recoil';
import ContentLayout from 'src/components/@common/ContentLayout';
import CartList from 'src/components/Cart/CartList';
import OrderInfo from 'src/components/Cart/OrderInfo';
import Header from 'src/components/Header';
import { useGetFetch } from 'src/hooks/useFetch';
import { cartListAtom } from 'src/recoil/cartList';
import { CartItem } from 'src/types';
import { styled } from 'styled-components';

const ShoppingBasket = () => {
  const cartList = useRecoilValue(cartListAtom); // 로그인 했을 경우에는 데이터를 받아오고, 그게 아닌 경우에는 로컬스토리지로 저장할 것.

  return (
    <>
      <Header />
      <ContentLayout>
        <BasketWrapper>
          <BasketTitle>장바구니</BasketTitle>
          <BasketContent>
            <CartList cartList={cartList} />
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
