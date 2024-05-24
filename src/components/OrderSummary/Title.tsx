import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { selectedCartItemIdsState } from "../../recoil/cart/selectedCartItemIds";
import { selectedCartItemsCountState } from "../../recoil/selectedCartItemsCount";

function Title() {
  const selectedUniqueCartItemsCount = useRecoilValue(
    selectedCartItemIdsState
  ).length;
  const selectedCartItemsCount = useRecoilValue(selectedCartItemsCountState);

  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.Info>
        총 {selectedUniqueCartItemsCount}종류의 상품 {selectedCartItemsCount}
        개를 주문합니다. <br />
        최종 결제 금액을 확인해 주세요.
      </S.Info>
    </S.Container>
  );
}

Title.Skeleton = () => {
  return (
    <S.Container>
      <S.Title>주문 확인</S.Title>
      <S.InfoSkeleton />
    </S.Container>
  );
};

export default Title;

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,

  Title: styled.div`
    font-size: 24px;
    line-height: 34.75px;
    font-weight: 700;
  `,

  Info: styled.div`
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    color: rgba(10, 13, 19, 1);
  `,

  InfoSkeleton: styled.div`
    width: 200px;
    height: 15px;
    background-color: #e0e0e0;
    border-radius: 4px;
  `,
};
