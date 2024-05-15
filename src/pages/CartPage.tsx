import styled from 'styled-components';
import Header from '../components/Header/Header';
import Title from '../components/common/Title/Title';
import CartItemList from '../components/CartItemList/CartItemList';
import PriceTable from '../components/PriceTable/PriceTable';
import { cartItemListQuery, cartItemListState } from '../recoil/cartItemList/cartItemListSelector';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { useEffect } from 'react';
import useCartListItem from '../recoil/cartItemList/useCartItemList';
import Button from '../components/common/Button/Button';
import { cartItemSelectedIdListAtom } from '../recoil/cartItem/cartItemAtom';
import { useNavigate } from 'react-router-dom';
import Spacer from '../components/common/Spacer/Spacer';

const CartPageContainer = styled.main`
  width: 100%;
  padding: 100px 20px 80px 20px;
`;

const EmptyPage = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartPage = () => {
  const { updateCartItemList } = useCartListItem();

  useEffect(() => {
    updateCartItemList();
  }, []);

  const isPending = useRecoilValueLoadable(cartItemListQuery);
  const cartItemList = useRecoilValue(cartItemListState);
  const selectedItemList = useRecoilValue(cartItemSelectedIdListAtom);

  const navigate = useNavigate();

  // TODO: atom은 초기값이 0이라서 새로고침하면 장바구니에 담은 상품이 없다고 잠깐 깜빡이는 문제가 있음
  // 따라서 이를 list를 가져오는 query의 loading state 값을 사용해 분기 처리가 필요함
  return (
    <>
      <Header />
      <CartPageContainer>
        {isPending.state === 'loading' && <div>로딩중</div>}
        {isPending.state === 'hasValue' && cartItemList.length !== 0 ? (
          <>
            <Title title="장바구니" description={`현재 ${cartItemList.length}종류의 상품이 담겨있습니다.`} />
            <Spacer height={36} />
            <CartItemList itemList={cartItemList} />
            <Spacer height={52} />
            <PriceTable />
          </>
        ) : (
          <>
            <Title title="장바구니" />
            <EmptyPage>
              <div>장바구니에 담은 상품이 없습니다.</div>
            </EmptyPage>
          </>
        )}
      </CartPageContainer>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: 'inherit' }}
        isDisabled={selectedItemList.length === 0 || cartItemList.length === 0}
        onClick={() => navigate('/confirm-purchase')}
      >
        주문 확인
      </Button>
    </>
  );
};

export default CartPage;
