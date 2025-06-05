import FooterButton from '../../../common/footerButton/FooterButton';
import * as S from './PaymentContents.styles';

function PaymentContents() {
  return (
    <S.Container>
      <S.InfoBox>
        <S.Title>결제 확인</S.Title>
        <S.Description>
          총 1종류의 상품 2개를 주문합니다.
          <br />
          최종 결제 금액을 확인해 주세요.
        </S.Description>
        <S.PriceBox>
          <S.PriceText>총 결제 금액</S.PriceText>
          <S.Price>70,000원</S.Price>
        </S.PriceBox>
      </S.InfoBox>
      <FooterButton onClick={() => {}}>장바구니로 돌아가기</FooterButton>
    </S.Container>
  );
}

export default PaymentContents;
