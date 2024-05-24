import styled from "styled-components";
import { useSelectedCartItemCount } from "../../hooks/useSelectedCartItemCount";

export default function PaymentTitle() {
  const { selectedCartItemCount, selectedUniqueCartItemCount } = useSelectedCartItemCount();
  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.InfoWrapper>
        <S.Info>
          총 {selectedUniqueCartItemCount}종류의 상품 {selectedCartItemCount}개를 주문합니다.
        </S.Info>
        <S.Info>최종 결제 금액을 확인해 주세요.</S.Info>
      </S.InfoWrapper>
    </S.Container>
  );
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Title: styled.div`
    font-size: 24px;
    line-height: 34.75px;
    font-weight: 700;
    margin-bottom: 12px;
  `,

  InfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
  `,

  Info: styled.div`
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    color: rgba(10, 13, 19, 1);
    margin: 0;
  `,
};
