import { useRecoilState, useSetRecoilState } from "recoil";
import useUpdateItemQuantity from "@/hooks/useUpdateItemQuantity";

import Button from "../_common/Button/Button";
import CheckBox from "../_common/CheckBox/CheckBox";
import Title from "../_common/Title/Title";
import Caption from "../_common/Caption/Caption";

import MinusButton from "@/assets/minus-button.svg?react";
import PlusButton from "@/assets/plus-button.svg?react";

import { CartItem } from "@/types/cart";

import * as S from "./ProductItem.style";

import { removeCartItem } from "@/apis";
import { cartItems } from "@/recoil/cartItems";
import { selectedCartItems } from "@/recoil/selectedCardItems";
import { formatToWon } from "@/utils/stringHelper";

const ProductItem = ({ item }: { item: CartItem }) => {
  const { product, id } = item;
  const { name, imageUrl, price } = product;

  const { quantity, handleIncreaseQuantity, handleDecreaseQuantity } =
    useUpdateItemQuantity(id);
  const [isSelected, setIsSelected] = useRecoilState(selectedCartItems(id));

  const setCartItemList = useSetRecoilState(cartItems);

  const handleRemoveItem = async () => {
    const canRemoveItem = await removeCartItem(id);

    if (canRemoveItem) {
      setCartItemList((prevCartItems) => {
        return prevCartItems.filter((item) => item.id !== id);
      });
    }
  };

  return (
    <S.ItemWrapper>
      <S.ItemButtonWrapper>
        <CheckBox
          id={`check-box-${id}`}
          isChecked={isSelected}
          onClick={() => setIsSelected((prevSelected) => !prevSelected)}
        />
        <Button
          width="fit"
          size="small"
          radiusVariant="rounded"
          onClick={handleRemoveItem}
        >
          <Caption text="삭제" />
        </Button>
      </S.ItemButtonWrapper>

      <S.ItemInfoBox>
        <S.ItemImgBox $imageUrl={imageUrl} />

        <S.ItemInfoTextBox>
          <S.FlexBox>
            <Caption text={name} />
            <Title text={formatToWon(price)} />
          </S.FlexBox>

          <S.UpdateButtonWrapper>
            <MinusButton onClick={handleDecreaseQuantity} />
            <S.ProductQuantity>{quantity}</S.ProductQuantity>
            <PlusButton onClick={handleIncreaseQuantity} />
          </S.UpdateButtonWrapper>
        </S.ItemInfoTextBox>
      </S.ItemInfoBox>
    </S.ItemWrapper>
  );
};

export default ProductItem;
