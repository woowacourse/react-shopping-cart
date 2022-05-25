import ProductThumbnail from "component/@shared/ProductThumbnail/ProductThumbnail";
import ProductName from "component/@shared/ProductName/ProductName";
import ProductQuantity from "component/@shared/ProductQuantity/ProductQuantity";

import { CartItem } from "type";
import {
  OrderContainer,
  LeftContainer,
  OrderItemInfoContainer,
} from "component/Order/OrderItem/OrderItem.style";

function OrderItem({
  name,
  thumbnail,
  quantity,
}: Pick<CartItem, "name" | "thumbnail" | "quantity">) {
  return (
    <OrderContainer>
      <LeftContainer>
        <ProductThumbnail src={thumbnail} type="orderItem" />
        <OrderItemInfoContainer>
          <ProductName type="orderItem">{name}</ProductName>
          <ProductQuantity>수량: {quantity}</ProductQuantity>
        </OrderItemInfoContainer>
      </LeftContainer>
    </OrderContainer>
  );
}

export default OrderItem;
