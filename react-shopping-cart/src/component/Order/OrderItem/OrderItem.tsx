import { ColumnFlexWrapper, RowFlexWrapper } from "styles/Wrapper";
import styled from "styled-components";
import ProductThumbnail from "component/@shared/ProductThumbnail/ProductThumbnail";
import { CartItem } from "type";
import ProductName from "component/@shared/ProductName/ProductName";
import ProductQuantity from "component/@shared/ProductQuantity/ProductQuantity";

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OrderItemInfoContainer = styled(ColumnFlexWrapper)`
  align-items: flex-start;
  justify-content: flex-start;
`;

function OrderItem({
  name,
  thumbnail,
  quantity,
}: Pick<CartItem, "name" | "thumbnail" | "quantity">) {
  return (
    <RowFlexWrapper>
      <LeftContainer>
        <ProductThumbnail src={thumbnail} type="orderItem" />
        <OrderItemInfoContainer>
          <ProductName type="orderItem">{name}</ProductName>
          <ProductQuantity>수량: {quantity}</ProductQuantity>
        </OrderItemInfoContainer>
      </LeftContainer>
    </RowFlexWrapper>
  );
}

export default OrderItem;
