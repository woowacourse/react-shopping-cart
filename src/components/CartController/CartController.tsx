import { ChangeEvent } from "react";
import type { NewCartItem, ProductItem } from "../../types/types";
import {
  AddCartButton,
  CartBox,
  ControllerWrapper,
  QuantityControlButton,
  QuantityInput,
} from "./CartController.style";
import { quantityByProductIdSelector } from "../../recoil/cartAtoms";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { cartState } from "../../recoil/cartAtoms";
import { fetchAddCart, fetchDeleteCart, fetchUpdateCart } from "../../api/api";

interface CartControllerProps {
  product: ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));

  const updateCartItemQuantity = useRecoilCallback(
    ({ snapshot, set }) =>
      async (productId: number, quantity: number) => {
        const cartList = await snapshot.getPromise(cartState);
        if (quantity === 0) {
          const id = productId as number;
          if (confirm("정말로 삭제하시겠습니까?")) {
            const removedCartList = cartList.filter((cart) => cart.id !== id);
            set(cartState, removedCartList);
            fetchDeleteCart(id);
          }
        } else {
          const targetIndex = cartList.findIndex(
            (cartItem) => cartItem.id === productId
          );

          if (targetIndex !== -1) {
            const updatedCartList = [...cartList];
            updatedCartList[targetIndex] = {
              ...updatedCartList[targetIndex],
              quantity,
            };
            set(cartState, updatedCartList);

            fetchUpdateCart(productId, quantity);
          }
        }
      },
    []
  );

  const addCartItem = useRecoilCallback(
    ({ snapshot, set }) =>
      async (product: ProductItem) => {
        const cartList = await snapshot.getPromise(cartState);
        const isCartItemExist = cartList.some(
          (cartItem) => cartItem.id === product.id
        );

        if (!isCartItemExist) {
          const newCartItem: NewCartItem = {
            id: product.id,
            quantity: 1,
            checked: true,
            product,
          };
          const updatedCartList = [...cartList, newCartItem];
          set(cartState, updatedCartList);
          fetchAddCart(newCartItem.id);
        }
      },
    []
  );

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantityInputValue = Number(
      event.target.value.replaceAll("/", "").replace(/\D/g, "")
    );
    const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;

    updateCartItemQuantity(product.id, newQuantity);
  };

  return (
    <>
      {quantity > 0 ? (
        <ControllerWrapper>
          <CartBox>
            <QuantityControlButton
              onClick={() => {
                updateCartItemQuantity(product.id, quantity - 1);
              }}
            >
              -
            </QuantityControlButton>
            <QuantityInput value={quantity} onChange={handleChangeQuantity} />
            <QuantityControlButton
              onClick={() => {
                updateCartItemQuantity(product.id, quantity + 1);
              }}
            >
              +
            </QuantityControlButton>
          </CartBox>
        </ControllerWrapper>
      ) : (
        <AddCartButton
          onClick={() => {
            addCartItem(product);
          }}
        >
          장바구니에 담기
        </AddCartButton>
      )}
    </>
  );
}

export default CartController;
