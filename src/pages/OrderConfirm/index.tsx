import * as S from './index.styles';
import Header from '../../components/feature/CartSection/Header';

const OrderConfirm = () => {
  return (
    <S.Container>
      <S.Wrapper>
        <Header
          title="주문 확인"
          description="총 1종류의 상품 2개를 주문합니다. 최종 결제 금액을 확인해 주세요."
        />
        <S.CartList></S.CartList>
      </S.Wrapper>
    </S.Container>
  );
};

export default OrderConfirm;
