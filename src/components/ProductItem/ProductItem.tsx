import { useRecoilState, useSetRecoilState } from "recoil";
import { cartItems } from "@/recoil/cartItems";
import { selectedCartItems } from "@/recoil/selectedCardItems";

import useUpdateItemQuantity from "@/hooks/useUpdateItemQuantity";

import { removeCartItem } from "@/apis";

import Button from "../_common/Button/Button";
import CheckBox from "../_common/CheckBox/CheckBox";
import Title from "../_common/Title/Title";
import Caption from "../_common/Caption/Caption";
import {
  StyledMinusButton,
  StyledPlusButton,
} from "../_common/QuantityButton/QuantityButton";

import LoadingSpinner from "@/assets/loading-spinner.svg?react";

import { CartItem } from "@/types/cart";

import Styled from "./ProductItem.style";

const ProductItem = ({ item }: { item: CartItem }) => {
  const { product, id } = item;
  const { name, imageUrl, price } = product;

  const setCartItemList = useSetRecoilState(cartItems);
  const [isSelected, setIsSelected] = useRecoilState(selectedCartItems(id));
  const {
    isUpdateLoading,
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  } = useUpdateItemQuantity(id);

  const handleRemoveItem = async () => {
    const canRemoveItem = await removeCartItem(id);

    if (canRemoveItem) {
      setCartItemList((prevCartItems) => {
        return prevCartItems.filter((item) => item.id !== id);
      });
      setIsSelected(false);
    }
  };

  return (
    <Styled.ItemWrapper>
      <Styled.ItemButtonWrapper>
        <CheckBox
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
      </Styled.ItemButtonWrapper>

      <Styled.ItemInfoBox>
        <Styled.ItemImgBox $imageUrl={imageUrl} />

        <Styled.ItemInfoTextBox>
          <Styled.ItemFlexBox>
            <Caption text={name} />
            <Title text={`${price.toLocaleString()}원`} />
          </Styled.ItemFlexBox>

          <Styled.UpdateButtonWrapper>
            <StyledMinusButton
              onClick={handleDecreaseQuantity}
              disabled={isUpdateLoading}
            />
            {isUpdateLoading ? (
              <LoadingSpinner />
            ) : (
              <Styled.ProductQuantity>{quantity}</Styled.ProductQuantity>
            )}

            <StyledPlusButton
              onClick={handleIncreaseQuantity}
              disabled={isUpdateLoading}
            />
          </Styled.UpdateButtonWrapper>
        </Styled.ItemInfoTextBox>
      </Styled.ItemInfoBox>
    </Styled.ItemWrapper>
  );
};

export default ProductItem;
