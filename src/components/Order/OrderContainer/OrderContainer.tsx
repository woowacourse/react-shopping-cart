/** @jsxImportSource @emotion/react */
import { COLOR_PALETTE } from "../../../colorPalette";
import { useCoupons } from "../../../hooks/useCoupons";
import Button from "../../common/Buttons/Button";
import Checkbox from "../../common/Buttons/Checkbox/Checkbox";
import {
  OrderContainerStyle,
  ShippingOptionCheckboxStyle,
  ShippingOptionContainerStyle,
  ShippingOptionTitleStyle,
} from "./OrderContainer.style";
import OrderItemList from "./OrderItemList/OrderItemList";

const OrderContainer = () => {
  const { coupons } = useCoupons();

  return (
    <div css={OrderContainerStyle}>
      <OrderItemList />
      <Button
        width="100%"
        height="48px"
        fontSize="15px"
        fontWeight="700"
        border={`1px solid ${COLOR_PALETTE.lightNormalGrey}`}
      >
        쿠폰 적용
      </Button>
      <div css={ShippingOptionContainerStyle}>
        <div css={ShippingOptionTitleStyle}>배송 정보</div>
        <div css={ShippingOptionCheckboxStyle}>
          <Checkbox isCheck={false} />
          <div>제주도 및 도서 산간 지역</div>
        </div>
      </div>
    </div>
  );
};

export default OrderContainer;
