import { useLocation, useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Spacing from '../../components/Spacing/Spacing';
import Text from '../../components/Text/Text';
import * as S from './OrderCompletedPage.styles';

export default function OrderCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const onTitleClick = () => {
    navigate('/');
  };

  return (
    <>
      <Header title="🔙" handleTitleClick={onTitleClick} />

      <S.OrderCompletedSection>
        <Text variant="title-1">주문 확인</Text>
        <Spacing size={27} />
        <Text variant="body-3">
          총 {location.state.kind}종류의 상품 {location.state.quantity}개를 주문합니다. <br />
          최종 결제 금액을 확인해 주세요.
        </Text>
        <Spacing size={24} />
        <Text variant="title-3">총 결제 금액</Text>
        <Spacing size={12} />
        <Text variant="title-1">{location.state.totalPrice.toLocaleString()}원</Text>
      </S.OrderCompletedSection>

      <S.ButtonWrapper>
        <Button isDisabled>결제하기</Button>
      </S.ButtonWrapper>
    </>
  );
}
