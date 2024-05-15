import styled from 'styled-components';
import Header from '../components/Header/Header';
import Title from '../components/common/Title/Title';
import CartItemList from '../components/CartItemList/CartItemList';
import PriceTable from '../components/PriceTable/PriceTable';
import { cartItemListState } from '../recoil/cartItemList/cartItemListSelector';
import { useRecoilValue } from 'recoil';
import { Suspense, useEffect } from 'react';
import useCartListItem from '../recoil/cartItemList/useCartItemList';
import Button from '../components/common/Button/Button';
import { cartItemSelectedIdListAtom } from '../recoil/cartItem/cartItemAtom';

const CartPageContainer = styled.main`
  width: 100%;
  padding: 30px 20px 80px 20px;
`;

const CartPage = () => {
  const { updateCartItemList } = useCartListItem();

  useEffect(() => {
    updateCartItemList();
  }, []);

  const cartItemList = useRecoilValue(cartItemListState);
  const selectedItemList = useRecoilValue(cartItemSelectedIdListAtom);

  return (
    <>
      <Header />
      <Suspense fallback={<div>,,, 로딩 ㅠ</div>}>
        <CartPageContainer>
          <Title title="장바구니" description={`현재 ${cartItemList.length}종류의 상품이 담겨있습니다.`} />
          {cartItemList.length === 0 ? '비어잇을 때 연출 추가' : <CartItemList itemList={cartItemList} />}

          <PriceTable />
        </CartPageContainer>
      </Suspense>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: 'inherit' }}
        isDisabled={selectedItemList.length === 0}
      >
        주문 확인
      </Button>
    </>
  );
};

export default CartPage;
