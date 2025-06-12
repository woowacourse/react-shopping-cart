import { CartItemWithSelection } from "../../../domains/cart/types/response";
import { formatCurrency } from "../../../utils/formatters";
import { getImageUrl } from "../../../utils/imageUrl";
import * as S from "./OrderItem.styles";

interface Props {
  quantity: CartItemWithSelection["quantity"];
  product: CartItemWithSelection["product"];
}

const OrderItem = ({ quantity, product }: Props) => {
  return (
    <S.OrderItem>
      <S.OrderItemImage $url={getImageUrl(product.imageUrl)} />
      <S.OrderItemInfo>
        <S.OrderItemName>{product.name}</S.OrderItemName>
        <S.OrderItemPrice>{formatCurrency(product.price)}</S.OrderItemPrice>
        <S.OrderItemQuantity>{quantity}개</S.OrderItemQuantity>
      </S.OrderItemInfo>
    </S.OrderItem>
  );
};

export default OrderItem;
