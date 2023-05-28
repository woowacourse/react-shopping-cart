import type { CartItem } from "../../types/types";
import CartController from "../CartController";
import {
  CartItemControllerWrapper,
  CartItemImage,
  CartItemInfo,
  CartItemInfoWrapper,
  CartItemLayout,
  CartItemName,
  CartItemPrice,
  CartItemTrashImage,
} from "./CartItem.style";
import trashIcon from "../../assets/trash.png";
import { useRecoilCallback } from "recoil";
import { cartState } from "../../recoil/cartAtoms.ts";
import { fetchDeleteCart } from "../../api/api.ts";

interface CartItemProps {
  cart: CartItem;
}

function CartItem({ cart }: CartItemProps) {
  const removeCartItem = useRecoilCallback(
    ({ snapshot, set }) =>
      async (id: number) => {
        const cartList = await snapshot.getPromise(cartState);
        if (confirm("정말로 삭제하시겠습니까?")) {
          const removedCartList = cartList.filter((cart) => cart.id !== id);
          set(cartState, removedCartList);
          fetchDeleteCart(id);
        }
      },
    []
  );

  const switchCheckbox = useRecoilCallback(
    ({ snapshot, set }) =>
      async (id: number) => {
        const cartList = [...(await snapshot.getPromise(cartState))];
        const targetIndex = cartList.findIndex(
          (cartItem) => cartItem.id === id
        );
        const targetCart = cartList[targetIndex];
        const updatedCart = {
          ...targetCart,
          checked: !targetCart.checked,
        };
        cartList[targetIndex] = updatedCart;
        set(cartState, cartList);
      },
    []
  );

  return (
    <CartItemLayout>
      <div>
        <input
          type="checkbox"
          checked={cart.checked}
          onChange={() => {
            switchCheckbox(cart.id);
          }}
        />
      </div>
      <CartItemImage
        src={cart.product.imageUrl}
        onClick={() => {
          switchCheckbox(cart.id);
        }}
      />
      <CartItemInfoWrapper>
        <CartItemInfo>
          <CartItemName
            onClick={() => {
              switchCheckbox(cart.id);
            }}
          >
            {cart.product.name}
          </CartItemName>
          <CartItemControllerWrapper>
            <CartItemTrashImage
              src={trashIcon}
              onClick={() => removeCartItem(cart.id)}
            />
            <CartController product={cart.product} />
          </CartItemControllerWrapper>
        </CartItemInfo>
        <CartItemPrice>{cart.product.price.toLocaleString()}원</CartItemPrice>
      </CartItemInfoWrapper>
    </CartItemLayout>
  );
}

export default CartItem;
