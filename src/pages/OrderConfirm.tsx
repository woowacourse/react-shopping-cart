import AdditionalShippingFeeArea from "@/components/Order/AdditionalShippingFeeArea";
import BorderButton from "@/components/common/Button/BorderButton";
import CartTitle from "@/components/Cart/CartTitle";
import CouponModal from "@/components/Order/CouponModal";
import FullWidthButton from "@/components/common/Button/FullWidthButton";
import Header from "@/components/Header";
import { ORDER_CONFIRM_MESSAGE } from "@/constants/message";
import OrderList from "@/components/Order/OrderList";
import OrderSummary from "@/components/Order/OrderSummary";
import { orderedItemState } from "@/store/selectors/summarySelector/cartSummarySelector";
import styled from "@emotion/styled";
import { useModal } from "hain-tain-components";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const OrderConfirm = () => {
  const { itemCount, totalQuantity } = useRecoilValue(orderedItemState);
  const navigate = useNavigate();
  const { isOpened, handleModalOpen, handelModalClose } = useModal();

  return (
    <>
      <StyledFixedTop>
        <Header type="ArrowBack" />
      </StyledFixedTop>
      <StyledScrollBox>
        <CartTitle
          title="주문 확인"
          details={[
            ORDER_CONFIRM_MESSAGE.confirmOrder(itemCount, totalQuantity),
            ORDER_CONFIRM_MESSAGE.confirmPrice,
          ]}
        />
        <OrderList />
        <BorderButton onClick={handleModalOpen} widthType="full">
          쿠폰 적용
        </BorderButton>
        <CouponModal isOpened={isOpened} closeModal={handelModalClose} />
        <AdditionalShippingFeeArea />
      </StyledScrollBox>
      <StyledFixedBottom>
        <OrderSummary />
        <FullWidthButton
          onClick={() => {
            navigate("/payment-confirm");
          }}
        >
          결제하기
        </FullWidthButton>
      </StyledFixedBottom>
    </>
  );
};

export default OrderConfirm;

const StyledFixedTop = styled.div`
  width: 430px;
  position: fixed;
  top: 0;
`;

const StyledScrollBox = styled.div`
  margin-top: 64px;
  overflow-y: scroll;
  height: calc(100vh - 280px);
  width: 430px;
`;

const StyledFixedBottom = styled.div`
  width: 430px;
  position: fixed;
  bottom: 0;
`;
