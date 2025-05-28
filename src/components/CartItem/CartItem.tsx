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
}

function CartItem({ cartItem }: CartItemProps) {
  const { id: cartId, product, quantity } = cartItem;

  return (
    <>
      <div css={ItemContainer}>
        <div css={ItemController}>
          <CheckBox id={String(cartId)} isSelected={true} />
          <button css={DeleteButton}>삭제</button>
        </div>
        <div css={ItemInfo}>
          <img css={ProductImage} src={product.imageUrl}></img>
          <div css={ItemContent}>
            <div css={ItemDetail}>
              <h3 css={ItemTitle}>{product.name}</h3>
              <p css={ItemPrice}>{product.price.toLocaleString()}원</p>
            </div>
            <div css={CountContainer}>
              <QuantityControlButton
                initialQuantity={quantity}
                cartId={cartId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
