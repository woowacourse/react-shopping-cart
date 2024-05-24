import type { CartItemType } from "../../types";

import {
  CartItemContainer,
  CartItemContent,
  CartItemDetails,
  CartItemHeader,
  CartItemInfo,
  ItemImage,
  ProductName,
} from "./style";

import { Price } from "../CartList/CheckoutSummary/style";

import BorderButton from "../common/BorderButton";
import CheckBox from "../common/CheckBox";
import CartItemQuantity from "./CartItemQuantity";

import { useRecoilValue } from "recoil";
import useDeleteCartItem from "../../hooks/useDeleteCartItem";
import useSelectCartItem from "../../hooks/useSelectCartItem";
import { cartItemQuantity } from "../../recoil/atoms";
import formatPriceToKoreanWon from "../../util/formatPriceToKoreanWon";

interface CartItemProps {
  cartItem: CartItemType;
  widthHeader?: boolean;
  widthCounter?: boolean;
}

export default function CartItem({
  cartItem: { id, product },
  widthHeader = false,
  widthCounter = false,
}: CartItemProps) {
  const { handleDelete } = useDeleteCartItem(id);
  const { isSelected, toggleSelected } = useSelectCartItem(id);
  const quantity = useRecoilValue(cartItemQuantity(id));

  return (
    <CartItemContainer key={id}>
      {widthHeader && (
        <CartItemHeader>
          <CheckBox
            isApplicable
            isSelected={isSelected}
            toggleSelected={toggleSelected}
            id={`checkbox_${id}`}
          />
          <BorderButton
            className="deleteBtn"
            onClick={handleDelete}
            size="large"
          >
            삭제
          </BorderButton>
        </CartItemHeader>
      )}

      <CartItemContent>
        <ItemImage src={product.imageUrl} />
        <CartItemDetails>
          <CartItemInfo>
            <ProductName>{product.name}</ProductName>
            <Price>{formatPriceToKoreanWon(product.price)}</Price>
          </CartItemInfo>
          {widthCounter ? (
            <CartItemQuantity itemId={id} />
          ) : (
            <div>{quantity}개</div>
          )}
        </CartItemDetails>
      </CartItemContent>
    </CartItemContainer>
  );
}
