/** @jsxImportSource @emotion/react */
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CartResultGuideStyle, CartResultGuideContainerStyle, CartResultsContainerStyle } from "./CartResults.style";
import PaymentDetail from "../../../PaymentDetail/PaymentDetail";
import Divider from "../../../Divider/Divider";
import { useRecoilValue } from "recoil";
import { orderAmountState, totalAmountState } from "../../../../store/selector/selectors";
import { SHIPPING_CONSTANT } from "../../../../constants";
import { itemIdsState } from "../../../../store/atom/atoms";

const CartResults = () => {
  const orderAmount = useRecoilValue(orderAmountState);
  const totalAmount = useRecoilValue(totalAmountState);
  const ids = useRecoilValue(itemIdsState);

  return (
    <div css={CartResultsContainerStyle}>
      {ids.length !== 0 && (
        <>
          <div css={CartResultGuideContainerStyle}>
            <IoIosInformationCircleOutline size={15} />
            <div css={CartResultGuideStyle}>
              총 주문 금액이 {SHIPPING_CONSTANT.FREE_CRITERIA.toLocaleString() + "원"} 이상일 경우 무료 배송됩니다.
            </div>
          </div>

          <Divider />
          <PaymentDetail title="주문 금액" amount={orderAmount} />
          <PaymentDetail
            title="배송비"
            amount={orderAmount >= SHIPPING_CONSTANT.FREE_CRITERIA ? 0 : SHIPPING_CONSTANT.FEE}
          />
          <Divider />
          <PaymentDetail title="총 결제 금액" amount={totalAmount} />
        </>
      )}
    </div>
  );
};

export default CartResults;
