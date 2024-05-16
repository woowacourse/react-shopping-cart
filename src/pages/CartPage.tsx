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
import LoadingFallback from '../components/LoadingFallback/LoadingFallback';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';

const CartPageContainer = styled.main`
  width: 100%;
  padding: 100px 20px 80px 20px;
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

  const ItemList = () => {
    if (isPending.state === 'loading' || cartItemList === null) {
      return (
        <>
          <Title title="장바구니" />
          <LoadingFallback />
        </>
      );
    }

    if (cartItemList.length === 0) {
      return (
        <>
          <Title title="장바구니" />
          <ErrorFallback />
        </>
      );
    }

    return (
      <>
        <Title title="장바구니" description={`현재 ${cartItemList.length}종류의 상품이 담겨있습니다.`} />
        <Spacer height={36} />
        <CartItemList itemList={cartItemList} />
        <Spacer height={52} />
        <PriceTable />
      </>
    );
  };

  return (
    <>
      <Header />
      <CartPageContainer>
        <ItemList />
      </CartPageContainer>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: 'inherit' }}
        isDisabled={selectedItemList.length === 0 || (cartItemList !== null && cartItemList.length === 0)}
        onClick={() => navigate('/confirm-purchase')}
      >
        주문 확인
      </Button>
    </>
  );
};

export default CartPage;
