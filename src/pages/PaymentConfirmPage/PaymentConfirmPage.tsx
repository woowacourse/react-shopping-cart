import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import { cartItems } from "@/recoil/cartItems";
import {
  selectedCartItemLengthSelector,
  selectedCartItemTotalQuantitySelector,
} from "@/recoil/selectedCardItems";
import { totalPaymentAmountSelector } from "@/recoil/orderInformation";

import useSelectAllCartItem from "@/hooks/useSelectAllCartItem";

import { getCartItems } from "@/apis";

import Header from "@/components/_common/Header/Header";
import Title from "@/components/_common/Title/Title";
import Caption from "@/components/_common/Caption/Caption";

import BottomFixedButton from "@/components/BottomFixedButton/BottomFixedButton";

import Styled from "./PaymentConfirmPage.style";

import CLIENT_PATH from "@/constants/path";

const PaymentConfirmPage = () => {
  const navigate = useNavigate();

  const setCartItems = useSetRecoilState(cartItems);
  const selectedCartItemLength = useRecoilValue(selectedCartItemLengthSelector);
  const selectedCartItemTotalQuantity = useRecoilValue(
    selectedCartItemTotalQuantitySelector
  );
  const totalPaymentAmount = useRecoilValue(totalPaymentAmountSelector);

  const { unselectAllItem } = useSelectAllCartItem();

  const routerToCartItemPage = async () => {
    setCartItems(await getCartItems());
    unselectAllItem();

    navigate(CLIENT_PATH.home);
  };

  return (
    <Styled.Wrapper>
      <Header />
      <Title text="결제 확인" />

      <Caption
        text={`총 ${selectedCartItemLength}종류의 상품 ${selectedCartItemTotalQuantity}개를 주문합니다.`}
      />
      <Caption text="최종 결제 금액을 확인해 주세요." />

      <Styled.ButtonText>총 결제 금액</Styled.ButtonText>
      <Title text={`${totalPaymentAmount.toLocaleString()}원`} />

      <BottomFixedButton
        onClick={routerToCartItemPage}
        buttonText="장바구니로 돌아가기"
      />
    </Styled.Wrapper>
  );
};

export default PaymentConfirmPage;
