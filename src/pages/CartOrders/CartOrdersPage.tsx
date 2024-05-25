import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Title from '../../components/common/Title/Title';
import CartItemList from '../../components/CartItemList/CartItemList';
import { PriceTable } from '../../components/PriceTable/PriceTable';
import { useRecoilValue } from 'recoil';
import Button from '../../components/common/Button/Button';
import { useNavigate } from 'react-router-dom';
import Spacer from '../../components/common/Spacer/Spacer';
import { cartItemListState } from '../../recoil/cartItemList/cartItemListState';
import { selectedCartItemIdListState } from '../../recoil/selectedCartItemList/selectedCartItemIdListState';
import { totalCartPriceState } from '../../recoil/price/totalCartPriceState';
import { cartShippingFeeState } from '../../recoil/price/cartShippingFeeState';
import { finalCartPriceState } from '../../recoil/price/finalCartPriceState';
import { ROUTES } from '../../constants/routes';
import CenterBox from '../../components/common/CenterBox/CenterBox';

const CartOrdersPageContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 50px 20px 80px 20px;
`;

const CartOrdersPage = () => {
  const cartItemList = useRecoilValue(cartItemListState);
  const selectedCartItemIdList = useRecoilValue(selectedCartItemIdListState);

  const navigate = useNavigate();

  const moveToConfirmPurchasePage = () => {
    navigate(ROUTES.CART_ORDER_FORM);
  };

  const totalCartPrice = useRecoilValue(totalCartPriceState);
  const shippingFee = useRecoilValue(cartShippingFeeState);
  const finalCartPrice = useRecoilValue(finalCartPriceState);

  return (
    <>
      <Header />
      <CartOrdersPageContainer>
        <Title
          title="장바구니"
          description={cartItemList.length !== 0 ? `현재 ${cartItemList.length}종류의 상품이 담겨있습니다.` : ''}
        />
        {cartItemList.length === 0 ? (
          <CenterBox>장바구니에 담은 상품이 없습니다.</CenterBox>
        ) : (
          <>
            <Spacer height={36} />
            <CartItemList />
            <Spacer height={52} />
            <PriceTable>
              <PriceTable.Row name="주문 금액" price={totalCartPrice} />
              <PriceTable.Row name="배송비" price={shippingFee} />
              <PriceTable.Row name="총 결제 금액" price={finalCartPrice} upperDivider />
            </PriceTable>
          </>
        )}
      </CartOrdersPageContainer>
      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: '100%', maxWidth: '768px' }}
        disabled={selectedCartItemIdList.length === 0 || cartItemList.length === 0}
        onClick={moveToConfirmPurchasePage}
      >
        결제하기
      </Button>
    </>
  );
};

export default CartOrdersPage;
