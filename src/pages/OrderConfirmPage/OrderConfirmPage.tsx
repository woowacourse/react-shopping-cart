import * as S from "./OrderConfirmPage.style";
import { useRecoilValue } from "recoil";

import Title from "@/components/_common/Title/Title";
import Caption from "@/components/_common/Caption/Caption";
import Button from "@/components/_common/Button/Button";

import {
  finalOrderItemCountSelector,
  shippingFeeSelector,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";
import { MESSAGES, TITLES } from "@/constants/cart";
import { formatToWon } from "@/utils/stringHelper";

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
      <Title text={TITLES.orderConfirm} />

      <>
        <Caption text={MESSAGES.orderInfo(typeLength, totalCount)} />
        <Caption text={MESSAGES.askOrderConfirm} />
      </>

      <S.ButtonText>{TITLES.totalPrice}</S.ButtonText>
      <Title text={formatToWon(totalPrice)} />

      <S.OrderConfirmButton>
        <Button width="full" size="xLarge" theme="dark" disabled>
          <S.ButtonText>{TITLES.pay}</S.ButtonText>
        </Button>
      </S.OrderConfirmButton>
    </S.FlexWrapper>
  );
};

export default OrderConfirmPage;
