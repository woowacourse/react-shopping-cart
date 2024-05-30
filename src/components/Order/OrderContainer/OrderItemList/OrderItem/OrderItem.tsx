/** @jsxImportSource @emotion/react */

import BasicCartItem from "../../../../common/BasicCartItem/BasicCartItem";
import Divider from "../../../../common/Divider/Divider";
import { OrderCartItemContainerStyle, OrderItemQuantityStyle } from "./OrderItem.style";

interface CartItemProps {
  CartItemInfo: CartItemInfo;
}

const OrderItem = ({ CartItemInfo }: CartItemProps) => {
  return (
    <div css={OrderCartItemContainerStyle}>
      <Divider />
      <BasicCartItem CartItemInfo={CartItemInfo}>
        <div css={OrderItemQuantityStyle}>{CartItemInfo.quantity + "개"}</div>
      </BasicCartItem>
    </div>
  );
};

export default OrderItem;
