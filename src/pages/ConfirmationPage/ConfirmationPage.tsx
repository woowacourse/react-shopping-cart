/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import Button from '../../shared/ui/Button';
import * as S from './ConfirmationPage.styles';
import { ROUTES } from '../../shared/constants/routeConstants';
import { useNavigate } from 'react-router';
import { getSelectedCartItemsFromLocalStorage } from '../../features/cart/utils/localStorageService';
import { useCartContext } from '../../shared/context/useCartContext';

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
  const selectedCartItems = getSelectedCartItemsFromLocalStorage();
  const { totalPurchasePrice } = useCartContext();

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(ROUTES.ROOT);
  };

  const cartTypeQuantity = selectedCartItems.length;
  const totalQuantity = selectedCartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <S.ConfirmationContainer>
      <S.ConfirmationSection>
        <S.ConfirmationTitle>주문 확인</S.ConfirmationTitle>
        <S.ConfirmationQuantity>
          총 {cartTypeQuantity}종류의 상품 {totalQuantity}개를 주문합니다.
        </S.ConfirmationQuantity>
        <S.ConfirmationQuantity>최종 결제 금액을 확인해 주세요.</S.ConfirmationQuantity>
        <S.ConfirmationTotalPurchasePriceLabel>총 결제 금액</S.ConfirmationTotalPurchasePriceLabel>
        <S.ConfirmationTotalPurchasePrice>{totalPurchasePrice.toLocaleString()}원</S.ConfirmationTotalPurchasePrice>
      </S.ConfirmationSection>
      <S.ConfirmationFooterContainer>
        <Button onClick={handleClick} title='결제하기' css={ButtonCSS} disabled={selectedCartItems.length === 0} />
      </S.ConfirmationFooterContainer>
    </S.ConfirmationContainer>
  );
}
