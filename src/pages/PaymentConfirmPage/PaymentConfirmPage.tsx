import ShoppingCartFetcher, { fetchCartItems } from '@apis/shoppingCart';
import { BottomButton } from '@components/common';
import { useSelectedCartItems } from '@hooks/shoppingCart';
import useOrderCosts from '@hooks/shoppingCart/useOrderCosts';
import { cartItemsAtom, selectedIdsAtom } from '@recoil/shoppingCart';
import { ROUTE_PATHS } from '@routes/route.constant';
import { formatKoreanCurrency } from '@utils/index';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import * as Styled from './PaymentConfirmPage.styled';

const PaymentConfirmPage: React.FC = () => {
  const { afterDiscountTotalPrice } = useOrderCosts();

  const { totalSelectedItemLength, selectedTotalQuantity } = useSelectedCartItems();

  const navigate = useNavigate();

  const setSelectedIds = useSetRecoilState(selectedIdsAtom);
  const setCartItems = useSetRecoilState(cartItemsAtom);

  const handleBackToShoppingCartPage = async () => {
    setSelectedIds(new Set());

    const cartItems = await ShoppingCartFetcher.getCartItems();
    setCartItems(cartItems);

    navigate(ROUTE_PATHS.root);
  };

  return (
    <Styled.OrderConfirmPageContainer>
      <Styled.Title>주문 확인</Styled.Title>
      <Styled.GuidText>
        총 {totalSelectedItemLength}종류의 상품 {selectedTotalQuantity}개를 주문합니다.
      </Styled.GuidText>
      <Styled.GuidText>최종 결제 금액을 확인해 주세요.</Styled.GuidText>
      <Styled.TotalPriceTitle>총 결제 금액 </Styled.TotalPriceTitle>
      <Styled.TotalPrice>{formatKoreanCurrency(afterDiscountTotalPrice)}</Styled.TotalPrice>
      <BottomButton onClick={handleBackToShoppingCartPage}>장바구니로 돌아가기</BottomButton>
    </Styled.OrderConfirmPageContainer>
  );
};

export default PaymentConfirmPage;
