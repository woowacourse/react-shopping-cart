import { CartItemType } from "../../types/response";
import CheckBox from "../CheckBox/CheckBox";
import QuantityControlButton from "../QuantityControlButton/QuantityControlButton";
import {
  CountContainer,
  DeleteButton,
  ItemContainer,
  ItemContent,
  ItemController,
  ItemDetail,
  ItemInfo,
  ItemPrice,
  ItemTitle,
  ProductImage,
} from "./CartItem.styles";

interface CartItemProps {
  cartItem: CartItemType;
  isSelected?: boolean;
  toggleSelect?: () => void;
  increaseQuantity?: (cartId: number) => Promise<void>;
  decreaseQuantity?: (cartId: number) => Promise<void>;
  deleteCartItem?: (cartId: number) => Promise<void>;
}

function CartItem({
  cartItem,
  isSelected,
  toggleSelect,
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
}: CartItemProps) {
  const { id: cartId, product, quantity } = cartItem;

  return (
    <>
      <div css={ItemContainer}>
        <div css={ItemController}>
          {isSelected && toggleSelect && (
            <CheckBox
              id={String(cartId)}
              isSelected={isSelected}
              onClick={toggleSelect}
            />
          )}
          {deleteCartItem && (
            <button css={DeleteButton} onClick={() => deleteCartItem(cartId)}>
              삭제
            </button>
          )}
        </div>
        <div css={ItemInfo}>
          <img
            css={ProductImage}
            src={product.imageUrl}
            onError={(error) => {
              error.currentTarget.src = "default-cartItem.png";
            }}
          ></img>
          <div css={ItemContent}>
            <div css={ItemDetail}>
              <h3 css={ItemTitle}>{product.name}</h3>
              <p css={ItemPrice}>{product.price.toLocaleString()}원</p>
            </div>
            <div css={CountContainer}>
              {decreaseQuantity && increaseQuantity ? (
                <QuantityControlButton
                  quantity={quantity}
                  decreaseQuantity={() => decreaseQuantity(cartId)}
                  increaseQuantity={() => increaseQuantity(cartId)}
                />
              ) : (
                <p>{quantity}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
