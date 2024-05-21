import { PropsWithChildren } from "react";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import Header from "../../components/Header";
import PageHeader from "../../components/PageHeader";
import BottomButton from "../../components/common/BottomButton";
import RecoilSuspense from "../../components/common/RecoilSuspense";
import Layout from "../../layout";
import { cartListState } from "../../recoil/atoms";
import {
  cartListTotalPrice,
  cartListTotalQuantity,
} from "../../recoil/selectors";
import formatPriceToKoreanWon from "../../util/formatPriceToKoreanWon";
import {
  ConfirmOrderContainer,
  OrderSummary,
  SubTitle,
  Title,
  TotalPrice,
} from "./styles";

const ConfirmOrderPage: React.FC<PropsWithChildren> = () => {
  const cartList = useRecoilValueLoadable(cartListState);
  const totalPrice = useRecoilValue(cartListTotalPrice);
  const totalQuantity = useRecoilValue(cartListTotalQuantity);

  return (
    <Layout
      header={<Header isShowLogo={false} />}
      bottom={<BottomButton isDisabled={true}>결제하기</BottomButton>}
    >
      <RecoilSuspense loadable={cartList} fallback={<div>안쪽 로딩 중...</div>}>
        <ConfirmOrderContainer>
          <PageHeader title="주문 확인">
            <OrderSummary>
              <span>{`총 ${cartList.contents.length}종류의 상품 ${totalQuantity}개를 주문합니다.`}</span>
              <span>최종 결제 금액을 확인해주세요.</span>
            </OrderSummary>
          </PageHeader>

          <TotalPrice>
            <SubTitle>총 결제 금액</SubTitle>
            <Title>{formatPriceToKoreanWon(totalPrice)}</Title>
          </TotalPrice>
        </ConfirmOrderContainer>
      </RecoilSuspense>
    </Layout>
  );
};

export default ConfirmOrderPage;
