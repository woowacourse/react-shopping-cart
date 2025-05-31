import * as S from "./CartItem.styled";
import CheckBox from "@/shared/components/CheckBox/CheckBox";
import CartItemQuantityButton from "./Button/Quantity/CartItemQuantityButton";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import ProductImage from "./ProductImage/ProductImage";

type CartItemProps = {
  cartItem: CartItemType;
  isChecked: boolean;
  onCheckBoxClick: (id: number, isChecked: boolean) => void;
  updateCartItem: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
};

export default function CartItem({
  cartItem,
  isChecked,
  updateCartItem,
  removeCartItem,
  onCheckBoxClick,
}: CartItemProps) {
  const { id, quantity, product } = cartItem;
  const { name, price, imageUrl } = product;

  return (
    <S.Item>
      <S.ItemHeader>
        <CheckBox
          isChecked={isChecked}
          onClick={() => onCheckBoxClick(id, isChecked)}
          aria-label="상품 선택"
        />
        <S.DeleteButton type="button" onClick={() => removeCartItem(id)}>
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
            updateCartItem={updateCartItem}
            removeCartItem={removeCartItem}
          />
        </S.ItemDetail>
      </S.ItemContent>
    </S.Item>
  );
}
