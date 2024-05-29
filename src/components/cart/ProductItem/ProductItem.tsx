import useUpdateItemQuantity from "@/hooks/cart/useUpdateItemQuantity.ts";
import Button from "../../_common/Button/Button.tsx";
import CheckBox from "../../_common/CheckBox/CheckBox.tsx";
import MinusButton from "@/assets/minus-button.svg?react";
import PlusButton from "@/assets/plus-button.svg?react";
import { CartItem } from "@/types/cart.ts";
import * as S from "./ProductItem.style.ts";
import { formatToWon } from "@/utils/stringHelper.ts";
import TextBox from "../../_common/TextBox/TextBox.tsx";
import useSelectedItems from "@/hooks/cart/useSelectedItems.ts";
import useCartItems from "@/hooks/cart/useCartItems.ts";

export type CartItemShowType = "readonly" | "edit";

const ProductItem = ({
  item,
  type = "edit",
}: {
  item: CartItem;
  type: CartItemShowType;
}) => {
  const { product } = item;
  const { name, imageUrl, price } = product;

  const { quantity, increaseQuantity, decreaseQuantity } =
    useUpdateItemQuantity(item.id);

  const { isItemSelected, onDeleteFromSelectedItems, onAddToSelectedItems } =
    useSelectedItems();

  const { deleteCartItem } = useCartItems();

  const onClickRemoveItem = async () => {
    deleteCartItem(item.id);
  };

  const onClickCheckBox = () => {
    isItemSelected(item.id)
      ? onDeleteFromSelectedItems(item.id)
      : onAddToSelectedItems(item.id);
  };

  return (
    <S.ItemWrapper type={type}>
      {type === "edit" && (
        <S.ItemButtonWrapper>
          <CheckBox
            id={`check-box-${item.id}`}
            isChecked={isItemSelected(item.id)}
            onClick={onClickCheckBox}
          />
          <Button
            width="fit"
            size="small"
            radiusVariant="rounded"
            onClick={onClickRemoveItem}
          >
            <TextBox type="xSmall" text="삭제" />
          </Button>
        </S.ItemButtonWrapper>
      )}

      <S.ItemInfoBox>
        <S.ItemImgBox $imageUrl={imageUrl} />

        <S.ItemInfoTextBox>
          <S.FlexBox>
            <TextBox type="xSmall" text={name} />
            <TextBox type="xLarge" text={formatToWon(price)} />
          </S.FlexBox>
          {type === "edit" && (
            <S.UpdateButtonWrapper>
              <MinusButton onClick={decreaseQuantity} />
              <S.ProductQuantity>{quantity}</S.ProductQuantity>
              <PlusButton onClick={increaseQuantity} />
            </S.UpdateButtonWrapper>
          )}
          {type === "readonly" && (
            <S.ProductQuantity>{quantity}개</S.ProductQuantity>
          )}
        </S.ItemInfoTextBox>
      </S.ItemInfoBox>
    </S.ItemWrapper>
  );
};

export default ProductItem;
