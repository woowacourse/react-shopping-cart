import useQuantityControl from "../../../hooks/cart/useQuantityControl";
import { CartItemType } from "../../../types/response";
import CheckBox from "../../CheckBox/CheckBox";
import QuantityControlButton from "../../QuantityControlButton/QuantityControlButton";
import {
  CountContainer,
  DeleteButton,
  ItemContainer,
  ItemContent,
  ItemController,
  ItemInfo,
} from "./CartItem.styles";
import CartItemImage from "../CartItemImage/CartItemImage";
import CartItemInfo from "../CartItemInfo/CartItemInfo";

interface CartItemProps {
  cartItem: CartItemType;
  fetchCartItem: () => void;
  isSelected: boolean;
  toggleSelect: () => void;
}

function CartItem({
  cartItem,
  fetchCartItem,
  isSelected,
  toggleSelect,
}: CartItemProps) {
  const { id: cartId, product, quantity: initialQuantity } = cartItem;
  const { decreaseQuantity, increaseQuantity, deleteCartItem, quantity } =
    useQuantityControl({
      initialQuantity,
      refetchCartItem: fetchCartItem,
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
          <CartItemImage image={product.imageUrl} />
          <div css={ItemContent}>
            <CartItemInfo name={product.name} price={product.price} />
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
