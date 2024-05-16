import styled from "styled-components";

import { useRecoilValue } from "recoil";

import Header from "@/components/layout/Header/Header";

import Title from "@/components/_common/Title/Title";
import Caption from "@/components/_common/Caption/Caption";
import BackButton from "@/components/_common/BackButton/BackButton";
import Button from "@/components/_common/Button/Button";

import { FlexCenter } from "@/styles/common";
import {
  finalOrderItemCountSelector,
  shippingFeeSelector,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";

const OrderConfirmPage = () => {
  const totalPrice =
    useRecoilValue(totalOrderPriceSelector) +
    useRecoilValue(shippingFeeSelector);

  const { typeLength, totalCount } = useRecoilValue(
    finalOrderItemCountSelector
  );
  0;
  return (
    <S.FlexWrapper>
      <Header>
        <BackButton />
      </Header>
      <Title text="주문 확인" />

      <S.CaptionWrapper>
        <Caption
          text={`총 ${typeLength}종류의 상품 ${totalCount}개를 주문합니다.`}
        />
        <Caption text="최종 결제 금액을 확인해 주세요." />
      </S.CaptionWrapper>

      <S.ButtonText>총 결제 금액</S.ButtonText>
      <Title text={`${totalPrice.toLocaleString()}원`} />

      <S.OrderConfirmButton>
        <Button width="full" size="xLarge" theme="dark" disabled>
          <S.ButtonText>결제하기</S.ButtonText>
        </Button>
      </S.OrderConfirmButton>
    </S.FlexWrapper>
  );
};

const FlexWrapper = styled.div`
  ${FlexCenter};
  flex-direction: column;
  height: calc(100vh - 128px);
  gap: 20px;
`;

const CaptionWrapper = styled.div``;

export const OrderConfirmButton = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 430px;
  margin: 0;
`;

export const ButtonText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
`;

const S = {
  FlexWrapper,
  CaptionWrapper,
  OrderConfirmButton,
  ButtonText,
};

export default OrderConfirmPage;
