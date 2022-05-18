import { ColumnFlexWrapper, RowFlexWrapper } from "styles/Wrapper";
import styled from "styled-components";
import ProductThumbnail from "component/@shared/ProductThumbnail/ProductThumbnail";
import { CartItem } from "type";
import ProductName from "component/@shared/ProductName/ProductName";
import ProductQuantity from "component/@shared/ProductQuantity/ProductQuantity";

const OrderContainer = styled(RowFlexWrapper)`
  justify-content: flex-start;
  width: 490px;
  padding: 20px 5px;
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors["gray_03"]};
`;

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
