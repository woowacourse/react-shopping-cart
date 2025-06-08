import * as S from "./CartItem.styled";
import CheckBox from "@/shared/components/CheckBox/CheckBox";
import CartItemQuantityButton from "./Button/Quantity/CartItemQuantityButton";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import ProductImage from "@/domains/components/ProductImage/ProductImage";

type CartItemProps = {
  cartItem: CartItemType;
  isChecked: boolean;
  onCheck: (id: number, isChecked: boolean) => void;
  onUpdateQuantity: (id: number, quantity: number) => Promise<void>;
  onRemove: (id: number) => Promise<void>;
};

export default function CartItem({
  cartItem,
  isChecked,
  onUpdateQuantity,
  onRemove,
  onCheck,
}: CartItemProps) {
  const { id, quantity, product } = cartItem;
  const { name, price, imageUrl } = product;

  return (
    <S.Item>
      <S.ItemHeader>
        <CheckBox
          isChecked={isChecked}
          onClick={() => onCheck(id, isChecked)}
          aria-label="상품 선택"
        />
        <S.DeleteButton type="button" onClick={() => onRemove(id)}>
          삭제
        </S.DeleteButton>
      </S.ItemHeader>

      <S.ItemContent>
        <ProductImage imageUrl={imageUrl} name={name} />
        <S.ItemDetail>
          <S.ItemDetailInfo>
            <S.ItemName>{name}</S.ItemName>
            <S.ItemPrice>{price.toLocaleString()}원</S.ItemPrice>
          </S.ItemDetailInfo>
          <CartItemQuantityButton
            id={id}
            quantity={quantity}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        </S.ItemDetail>
      </S.ItemContent>
    </S.Item>
  );
}
