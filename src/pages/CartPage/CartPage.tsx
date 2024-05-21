import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Title from '../../components/common/Title/Title';
import CartItemList from '../../components/CartItemList/CartItemList';
import PriceTable from '../../components/PriceTable/PriceTable';
import { useRecoilValue } from 'recoil';
import Button from '../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import Spacer from '../../components/common/Spacer/Spacer';
import { cartItemListState } from '../../recoil/cartItemList/cartItemListState';
import CartItemListLoader from './CartItemListLoader';
import { selectedCartItemIdListState } from '../../recoil/selectedCartItemIdList/selectedCartItemIdListState';

const CartPageContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 50px 20px 80px 20px;
`;

const CartPage = () => {
  const cartItemList = useRecoilValue(cartItemListState);
  const selectedCartItemIdList = useRecoilValue(selectedCartItemIdListState);

  const navigate = useNavigate();

  const moveToConfirmPurchasePage = () => {
    navigate('/confirm-purchase', {
      state: cartItemList.filter(({ cartItemId }) => selectedCartItemIdList.includes(cartItemId)),
    });
  };

  return (
    <>
      <Header />
      <CartPageContainer>
        <CartItemListLoader>
          <Title title="장바구니" description={`현재 ${cartItemList.length}종류의 상품이 담겨있습니다.`} />
          <Spacer height={36} />
          <CartItemList />
          <Spacer height={52} />
          <PriceTable />
        </CartItemListLoader>
      </CartPageContainer>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: '100%', maxWidth: '768px' }}
        isDisabled={selectedCartItemIdList.length === 0 || (cartItemList !== null && cartItemList.length === 0)}
        onClick={moveToConfirmPurchasePage}
      >
        주문 확인
      </Button>
    </>
  );
};

export default CartPage;
