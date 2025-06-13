import { CartItemType } from "@/apis/cartItems/cartItem.type";
import * as S from "./OrderItem.styled";
import ProductImage from "@/domains/components/ProductImage/ProductImage";

type OrderItemProps = {
  orderItem: CartItemType;
};

export default function OrderItem({ orderItem }: OrderItemProps) {
  const { quantity, product } = orderItem;
  const { name, price, imageUrl } = product;

  return (
    <S.Item>
      <S.ItemContent>
        <ProductImage imageUrl={imageUrl} name={name} />
        <S.ItemDetail>
          <S.ItemDetailInfo>
            <S.ItemName>{name}</S.ItemName>
            <S.ItemPrice>{price.toLocaleString()}원</S.ItemPrice>
          </S.ItemDetailInfo>
          <S.ItemQuantityText>{quantity}개</S.ItemQuantityText>
        </S.ItemDetail>
      </S.ItemContent>
    </S.Item>
  );
}
