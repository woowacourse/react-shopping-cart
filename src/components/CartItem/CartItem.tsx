import useQuantityControl from "../../hooks/useQuantityControl";
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
  handleCartItem: (cartId: number, cartItem: CartItemType) => void;
  isSelected: boolean;
  toggleSelect: () => void;
}

function CartItem({
  cartItem,
  handleCartItem,
  isSelected,
  toggleSelect,
}: CartItemProps) {
  const { id: cartId, product, quantity } = cartItem;

  const handleQuantity = (updateQuantity: (prev: number) => number) => {
    const newQuantity = updateQuantity(quantity);
    const newCartItem = { id: cartId, product, quantity: newQuantity };
    handleCartItem(cartId, newCartItem);
  };

  const { decreaseQuantity, increaseQuantity, deleteCartItem } =
    useQuantityControl({
      quantity,
      handleQuantity,
    });

  return (
    <>
      <div css={ItemContainer}>
        <div css={ItemController}>
          <CheckBox
            id={String(cartId)}
            isSelected={isSelected}
            onClick={toggleSelect}
          />
          <button css={DeleteButton} onClick={() => deleteCartItem(cartId)}>
            삭제
          </button>
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
              <QuantityControlButton
                quantity={quantity}
                decreaseQuantity={() => decreaseQuantity(cartId)}
                increaseQuantity={() => increaseQuantity(cartId)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
