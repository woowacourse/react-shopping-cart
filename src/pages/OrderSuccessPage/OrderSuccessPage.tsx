/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import Button from '../../shared/ui/Button';
import Navbar from '../../shared/ui/Navbar';
import * as S from './OrderSuccessPage.styles';
import { ROUTES } from '../../shared/constants/routeConstants';
import { useNavigate } from 'react-router';

const ButtonCSS = css`
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #333;
  }

  &:disabled {
    background-color: #bebebe;
    cursor: not-allowed;
  }
`;

export default function OrderSuccessPage() {
  const { SelectedCartItems, cartTypeQuantity, totalQuantity, totalPurchasePrice } = useSelectedCartItemsContext();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.ROOT);
  };

  return (
    <S.OrderSuccessContainer>
      <Navbar title="◀" url={ROUTES.ROOT} />
      <S.OrderSuccessSection>
        <S.OrderSuccessTitle>주문 확인</S.OrderSuccessTitle>
        <S.OrderSuccessQuantity>
          총 {cartTypeQuantity}종류의 상품 {totalQuantity}개를 주문합니다.
        </S.OrderSuccessQuantity>
        <S.OrderSuccessQuantity>최종 결제 금액을 확인해 주세요.</S.OrderSuccessQuantity>
        <S.OrderSuccessTotalPurchasePriceLabel>총 결제 금액</S.OrderSuccessTotalPurchasePriceLabel>
        <S.OrderSuccessTotalPurchasePrice>{totalPurchasePrice.toLocaleString()}원</S.OrderSuccessTotalPurchasePrice>
      </S.OrderSuccessSection>
      <S.OrderSuccessFooterContainer>
        <Button onClick={handleClick} title="결제하기" css={ButtonCSS} disabled={SelectedCartItems.length === 0} />
      </S.OrderSuccessFooterContainer>
    </S.OrderSuccessContainer>
  );
}
