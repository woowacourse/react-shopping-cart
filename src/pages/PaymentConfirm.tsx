import { FlexCenter, FlexColumn } from "@/style/common.style";
import { cartListState, selectedCouponsState } from "@/store/atoms/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

import FullWidthButton from "@/components/common/Button/FullWidthButton";
import Header from "@/components/Header";
import { ORDER_CONFIRM_MESSAGE } from "@/constants/message";
import { getCartList } from "@/api/cartItem";
import { orderSummaryState } from "@/store/selectors/summarySelector/orderSummarySelector";
import { orderedItemState } from "@/store/selectors/summarySelector/cartSummarySelector";
import { postOrders } from "@/api/orders";
import { selectedItemsState } from "@/store/selectors/selectedSelector/selectedItemsSelector";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const PaymentConfirm = () => {
  const { totalPrice } = useRecoilValue(orderSummaryState);
  const { itemCount, totalQuantity } = useRecoilValue(orderedItemState);
  const selectedItems = useRecoilValue(selectedItemsState);
  const setSelectedCoupons = useSetRecoilState(selectedCouponsState);

  const navigate = useNavigate();
  const setCartList = useSetRecoilState(cartListState);
  const refreshCartList = async () => {
    const newList = await getCartList();
    setCartList(newList);
  };

  const handleClick = () => {
    const postData = async () => {
      const cartItemsIds = selectedItems.map((item) => item.id);

      await postOrders(cartItemsIds);
    };

    postData();
    setSelectedCoupons([]);
    refreshCartList();
    navigate("/");
  };

  return (
    <>
      <StyledFixedTop>
        <Header type="ArrowBack" />
      </StyledFixedTop>
      <StyledCenterBox>
        <StyledTextTitle>결제 확인</StyledTextTitle>

        <StyledTextBody>
          {ORDER_CONFIRM_MESSAGE.confirmOrder(itemCount, totalQuantity)}
        </StyledTextBody>
        <StyledTextBody> {ORDER_CONFIRM_MESSAGE.confirmPrice}</StyledTextBody>

        <StyledTextSubTitle>총 결제 금액</StyledTextSubTitle>
        <StyledTextPrice>
          {totalPrice.toLocaleString("ko-KR")}원
        </StyledTextPrice>
      </StyledCenterBox>

      <StyledFixedBottom>
        <FullWidthButton onClick={handleClick}>
          장바구니로 돌아가기
        </FullWidthButton>
      </StyledFixedBottom>
    </>
  );
};

export default PaymentConfirm;

const StyledFixedTop = styled.div`
  width: 430px;
  position: fixed;
  top: 0;
`;

const StyledFixedBottom = styled.div`
  width: 430px;
  position: fixed;
  bottom: 0;
`;

const StyledCenterBox = styled.div`
  ${FlexColumn}
  ${FlexCenter}
  height: 100vh;
`;

const StyledTextTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;

const StyledTextBody = styled.p`
  font-size: 12px;
  margin: 0;
`;
const StyledTextSubTitle = styled.h2`
  font-size: 16px;
  margin: 0;
  margin-top: 24px;
`;
const StyledTextPrice = styled.p`
  font-size: 24px;
  font-weight: 700;
  margin: 10px;
`;
