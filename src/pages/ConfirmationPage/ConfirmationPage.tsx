/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useSelectedCartItemsContext } from '../../features/cart/context/useSelectedCartItemsContext';
import Button from '../../shared/ui/Button';
import Navbar from '../../shared/ui/Navbar';
import * as S from './ConfirmationPage.styles';
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

export default function ConfirmationPage() {
  const { SelectedCartItems } = useSelectedCartItemsContext();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.ROOT);
  };

  const cartTypeQuantity = SelectedCartItems.length;
  const totalQuantity = SelectedCartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = SelectedCartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <S.ConfirmationContainer>
      <Navbar title="◀" url={ROUTES.ROOT} />
      <S.ConfirmationSection>
        <S.ConfirmationTitle>주문 확인</S.ConfirmationTitle>
        <S.ConfirmationQuantity>
          총 {cartTypeQuantity}종류의 상품 {totalQuantity}개를 주문합니다.
        </S.ConfirmationQuantity>
        <S.ConfirmationQuantity>최종 결제 금액을 확인해 주세요.</S.ConfirmationQuantity>
        <S.ConfirmationTotalPurchasePriceLabel>총 결제 금액</S.ConfirmationTotalPurchasePriceLabel>
        <S.ConfirmationTotalPurchasePrice>{totalPrice.toLocaleString()}원</S.ConfirmationTotalPurchasePrice>
      </S.ConfirmationSection>
      <S.ConfirmationFooterContainer>
        <Button onClick={handleClick} title="결제하기" css={ButtonCSS} disabled={SelectedCartItems.length === 0} />
      </S.ConfirmationFooterContainer>
    </S.ConfirmationContainer>
  );
}
