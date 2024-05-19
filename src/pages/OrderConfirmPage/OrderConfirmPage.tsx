import { useRecoilValue } from "recoil";
import {
  finalOrderItemCountSelector,
  shippingFeeSelector,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";

import Header from "@/components/_common/Header/Header";
import Title from "@/components/_common/Title/Title";
import Caption from "@/components/_common/Caption/Caption";
import BackButton from "@/components/_common/BackButton/BackButton";

import OrderConfirmButton from "@/components/OrderConfirmButton/OrderConfirmButton";

import Styled from "./OrderConfirmPage.styles";

const OrderConfirmPage = () => {
  const totalPrice =
    useRecoilValue(totalOrderPriceSelector) +
    useRecoilValue(shippingFeeSelector);

  const { typeLength, totalCount } = useRecoilValue(
    finalOrderItemCountSelector
  );

  return (
    <Styled.Wrapper>
      <Header>
        <BackButton />
      </Header>
      <Title text="주문 확인" />

      <Caption
        text={`총 ${typeLength}종류의 상품 ${totalCount}개를 주문합니다.`}
      />
      <Caption text="최종 결제 금액을 확인해 주세요." />

      <Styled.ButtonText>총 결제 금액</Styled.ButtonText>
      <Title text={`${totalPrice.toLocaleString()}원`} />

      <OrderConfirmButton disabled={true} />
    </Styled.Wrapper>
  );
};

export default OrderConfirmPage;
