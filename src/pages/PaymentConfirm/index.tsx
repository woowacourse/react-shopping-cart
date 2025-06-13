import * as S from './confirm.styles';
import {formatPrice} from '../../utils/formatPrice';
import Button from '../../components/common/Button';
import {useLocation, useNavigate} from 'react-router';
import {css} from '@emotion/react';
import {ROUTE_PATHS} from '../../route/path';

const PaymentConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  if (!location.state)
    return (
      <S.ErrorDescription>
        잘못된 경로로 들어왔습니다.
        <br />
        뒤로가기 버튼을 눌러주세요!
      </S.ErrorDescription>
    );

  const {sort, totalAmount, totalPrice} = location.state;

  return (
    <S.Container data-testid="order-confirm-description">
      <S.Wrapper>
        <S.Title>주문 확인</S.Title>
        <S.Description>
          총 {sort}종류의 상품 {totalAmount}개를 주문합니다.
          <br /> 최종 결제 금액을 확인해 주세요.
        </S.Description>
        <S.PriceSection>
          <S.PriceSection>총 결제 금액</S.PriceSection>
          <S.Price>{formatPrice(totalPrice)}</S.Price>
        </S.PriceSection>
      </S.Wrapper>

      <Button
        title="장바구니로 돌아가기"
        onClick={() => navigate(ROUTE_PATHS.MAIN)}
        mode="dark"
        css={css`
          padding: 24px 0;
        `}
      />
    </S.Container>
  );
};

export default PaymentConfirm;
