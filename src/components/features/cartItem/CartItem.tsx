import { deleteCartItem } from "../../../services/cartService";
import Checkbox from "../../@common/checkbox/Checkbox";
import CountButton from "../countButton/CountButton";
import * as S from "./CartItem.styles";
import type { CartItemType } from "../../../types/response";

interface CartItemProps {
  cartData: CartItemType;
  updateCartItem: (cartId: number) => void;
  increaseCartItem: (cartId: number, quantity: number) => void;
  justifyIsChecked: (cartId: number) => boolean;
  controlCheckBox: (cartId: number) => void;
}

const CartItem = ({
  cartData,
  updateCartItem,
  increaseCartItem,
  justifyIsChecked,
  controlCheckBox,
}: CartItemProps) => {
  return (
    <>
      <div css={S.cartItemWrapper}>
        <div css={S.cartItemController}>
          <Checkbox
            checked={justifyIsChecked(cartData.id)}
            onChange={() => controlCheckBox(cartData.id)}
          />
          <button onClick={() => deleteCartItem(cartData.id)}>삭제</button>
        </div>
        <div key={cartData.id} css={S.cartItemStyle}>
          <img src={cartData.product.imageUrl} alt={cartData.product.name} />
          <div css={S.cartInfoStyle}>
            <h3 css={S.cartItemNameStyle}>{cartData.product.name}</h3>
            <p css={S.cartItemPriceStyle}>
              {cartData.product.price.toLocaleString()}원
            </p>
            <CountButton
              updateCartItem={() => {
                updateCartItem(cartData.id);
              }}
              quantity={cartData.quantity}
              cartId={cartData.id}
              increaseCartItem={increaseCartItem}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
