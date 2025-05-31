import * as S from "./CartItem.styled";
import CheckBox from "@/shared/components/CheckBox/CheckBox";
import DefaultItemIcon from "@assets/icons/default-item.svg";
import CartItemQuantityButton from "./Button/Quantity/CartItemQuantityButton";
import { CartItemType } from "@/apis/cartItems/cartItem.type";
import { SyntheticEvent } from "react";
import { deleteCartItem } from "@/apis/cartItems/deleteCartItem";
import useMutation from "@/shared/hooks/useMutation";

type CartItemProps = {
  cartItem: CartItemType;
  refetchCartItems: () => Promise<void>;
  isChecked: boolean;
  addSelectedItem: (id: number) => void;
  removeSelectedItem: (id: number) => void;
};

export default function CartItem({
  cartItem,
  refetchCartItems,
  isChecked,
  addSelectedItem,
  removeSelectedItem,
}: CartItemProps) {
  const { id, quantity, product } = cartItem;
  const { name, price, imageUrl } = product;
  const { mutate: removeCartItemMutate } = useMutation(() =>
    deleteCartItem(id)
  );

  const imageLoadError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.src = DefaultItemIcon;
  };

  const removeCartItem = async () => {
    await removeCartItemMutate(undefined);
    refetchCartItems();
    removeSelectedItem(id);
  };

  const handleCheckBoxClick = () => {
    if (isChecked) {
      removeSelectedItem(id);
      return;
    }

    addSelectedItem(id);
  };

  return (
    <S.Item>
      <S.ItemHeader>
        <CheckBox
          isChecked={isChecked}
          onClick={handleCheckBoxClick}
          aria-label="상품 선택"
        />
        <S.DeleteButton type="button" onClick={removeCartItem}>
          삭제
        </S.DeleteButton>
      </S.ItemHeader>

      <S.ItemContent>
        <S.ItemImage
          src={imageUrl ?? DefaultItemIcon}
          alt={`${name} 상품`}
          onError={imageLoadError}
        />
        <S.ItemDetail>
          <S.ItemDetailInfo>
            <S.ItemName>{name}</S.ItemName>
            <S.ItemPrice>{price.toLocaleString()}원</S.ItemPrice>
          </S.ItemDetailInfo>
          <CartItemQuantityButton
            cartItemId={id}
            quantity={quantity}
            refetchCartItems={refetchCartItems}
            removeSelectedItem={removeSelectedItem}
          />
        </S.ItemDetail>
      </S.ItemContent>
    </S.Item>
  );
}
