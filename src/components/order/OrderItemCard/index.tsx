import { CartItem } from "@/types/cartItem";
import * as S from "./styled";

interface OrderItemCardProps {
  cartItem: CartItem;
}
const OrderItemCard = ({ cartItem }: OrderItemCardProps) => {
  const { product, quantity } = cartItem;

  return (
    <S.Container>
      <S.Body>
        <S.ItemImg src={product.imageUrl} />
        <S.ItemInfoWrapper>
          <S.ItemInfo>
            <span>{product.name}</span>
            <S.ItemPrice>{product.price.toLocaleString("ko-KR")}원</S.ItemPrice>
          </S.ItemInfo>
          <S.ItemQuantity>
            <span>{quantity}개</span>
          </S.ItemQuantity>
        </S.ItemInfoWrapper>
      </S.Body>
    </S.Container>
  );
};

export default OrderItemCard;
