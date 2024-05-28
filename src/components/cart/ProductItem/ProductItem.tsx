import { useSetRecoilState } from "recoil";
import useUpdateItemQuantity from "@/hooks/cart/useUpdateItemQuantity.ts";
import Button from "../../_common/Button/Button.tsx";
import CheckBox from "../../_common/CheckBox/CheckBox.tsx";
import MinusButton from "@/assets/minus-button.svg?react";
import PlusButton from "@/assets/plus-button.svg?react";
import { CartItem } from "@/types/cart.ts";
import * as S from "./ProductItem.style.ts";
import { cartItemsState } from "@/recoil/cartItems.ts";
import { formatToWon } from "@/utils/stringHelper.ts";
import { removeCartItem } from "@/apis/cart.ts";
import TextBox from "../../_common/TextBox/TextBox.tsx";
import useSelectedItems from "@/hooks/cart/useSelectedItems.ts";

export type CartItemShowType = "readonly" | "edit";

const ProductItem = ({
  item,
  type = "edit",
}: {
  item: CartItem;
  type: CartItemShowType;
}) => {
  const { product, id } = item;
  const { name, imageUrl, price } = product;

  const { quantity, increaseQuantity, decreaseQuantity } =
    useUpdateItemQuantity(id);

  const { isItemSelected, onDeleteFromSelectedItems, onAddToSelectedItems } =
    useSelectedItems();

  const setCartItemList = useSetRecoilState(cartItemsState);

  const onClickRemoveItem = async () => {
    const canRemoveItem = await removeCartItem(id);

    if (canRemoveItem) {
      setCartItemList((prevCartItems) => {
        return prevCartItems.filter((item) => item.id !== id);
      });
    }
  };

  const onClickCheckBox = () => {
    isItemSelected(id)
      ? onDeleteFromSelectedItems(id)
      : onAddToSelectedItems(id);
  };

  return (
    <S.ItemWrapper type={type}>
      {type === "edit" && (
        <S.ItemButtonWrapper>
          <CheckBox
            id={`check-box-${id}`}
            isChecked={isItemSelected(id)}
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
