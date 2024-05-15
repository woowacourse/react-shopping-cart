import styled from 'styled-components';
import Header from '../components/Header/Header';
import Title from '../components/common/Title/Title';
import CartItemList from '../components/CartItemList/CartItemList';
import PriceTable from '../components/PriceTable/PriceTable';
import { cartItemListState } from '../recoil/cartItemList/cartItemListSelector';
import useCartListItem from '../recoil/cartItemList/useTest';
import { useRecoilValue } from 'recoil';
import { Suspense } from 'react';

const CartPageContainer = styled.main`
  width: 100%;
  padding: 100px 16px 0 16px;
`;

const CartPage = () => {
  const { deleteCartItem } = useCartListItem();
  const cartItemList = useRecoilValue(cartItemListState);

  return (
    <>
      <Header />
      <Suspense fallback={<div>,,, 로딩 ㅠ</div>}>
        <CartPageContainer>
          <Title title="장바구니" description="현재 2종류의 상품이 담겨있습니다." />
          {cartItemList.length === 0 ? 'ㅠㅠ' : <CartItemList itemList={cartItemList} />}

          <PriceTable />
        </CartPageContainer>
      </Suspense>
    </>
  );
};

export default CartPage;
