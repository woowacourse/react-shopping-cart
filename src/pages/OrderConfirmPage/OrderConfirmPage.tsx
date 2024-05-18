import * as S from "./OrderConfirmPage.style";
import { useRecoilValue } from "recoil";

import Title from "@/components/_common/Title/Title";
import Caption from "@/components/_common/Caption/Caption";
import Button from "@/components/_common/Button/Button";

import {
  shippingFeeSelector,
  totalItemOrderCountSelector,
  totalOrderPriceSelector,
} from "@/recoil/orderInformation";
import { MESSAGES, TITLES } from "@/constants/cart";
import { formatToWon } from "@/utils/stringHelper";
import { selectedCartItemsIdState } from "@/recoil/selectedCardItems";
const OrderConfirmPage = () => {
  const totalPrice =
    useRecoilValue(totalOrderPriceSelector) +
    useRecoilValue(shippingFeeSelector);

  const totalItemsCount = useRecoilValue(totalItemOrderCountSelector);
  const selectedItemsId = useRecoilValue(selectedCartItemsIdState);
  return (
    <S.FlexWrapper>
      <Title text={TITLES.orderConfirm} />

      <>
        <Caption
          text={MESSAGES.orderInfo(selectedItemsId.length, totalItemsCount)}
        />
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
