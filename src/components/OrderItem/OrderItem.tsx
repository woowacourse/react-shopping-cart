import { CartItemWithSelection } from "../../types/response";
import * as S from "./OrderItem.styles";

interface Props {
  quantity: CartItemWithSelection["quantity"];
  product: CartItemWithSelection["product"];
}

const OrderItem = ({ quantity, product }: Props) => {
  return (
    <S.OrderItem>
      <S.OrderItemImage $url={product.imageUrl} />
      <S.OrderItemInfo>
        <S.OrderItemName>{product.name}</S.OrderItemName>
        <S.OrderItemPrice>{product.price.toLocaleString()}원</S.OrderItemPrice>
        <S.OrderItemQuantity>{quantity}개</S.OrderItemQuantity>
      </S.OrderItemInfo>
    </S.OrderItem>
  );
};

export default OrderItem;
