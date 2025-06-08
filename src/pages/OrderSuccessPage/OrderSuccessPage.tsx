/** @jsxImportSource @emotion/react */

import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import Navbar from '../../shared/ui/Navbar';
import * as S from './OrderSuccessPage.styles';
import { ROUTES } from '../../shared/constants/routeConstants';
import { useNavigate } from 'react-router';
import NavFooter from '../../shared/ui/NavFooter';

export default function OrderSuccessPage() {
  const { cartTypeQuantity, totalQuantity, totalPurchasePrice } = useSelectedCartItemsContext();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.ROOT);
  };

  return (
    <S.OrderSuccessContainer>
      <Navbar />
      <S.OrderSuccessSection>
        <S.OrderSuccessTitle>결제 확인</S.OrderSuccessTitle>
        <S.OrderSuccessQuantity>
          총 {cartTypeQuantity}종류의 상품 {totalQuantity}개를 주문합니다.
        </S.OrderSuccessQuantity>
        <S.OrderSuccessQuantity>최종 결제 금액을 확인해 주세요.</S.OrderSuccessQuantity>
        <S.OrderSuccessTotalPurchasePriceLabel>총 결제 금액</S.OrderSuccessTotalPurchasePriceLabel>
        <S.OrderSuccessTotalPurchasePrice>{totalPurchasePrice.toLocaleString()}원</S.OrderSuccessTotalPurchasePrice>
      </S.OrderSuccessSection>
      <NavFooter title="장바구니로 돌아가기" onClick={handleClick} />
    </S.OrderSuccessContainer>
  );
}
