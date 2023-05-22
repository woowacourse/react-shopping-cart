import { ChangeEvent } from "react";
import type { ProductItem } from "../../types/types";
import {
  AddCartButton,
  CartBox,
  ControllerWrapper,
  QuantityControlButton,
  QuantityInput,
} from "./CartController.style";
import {
  addCartItemSelector,
  quantityByProductIdSelector,
  updateCartItemQuantitySelector,
} from "../../recoil/cartAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface CartControllerProps {
  product: ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));
  const updateCartItemQuantity = useSetRecoilState(
    updateCartItemQuantitySelector(product.id)
  );

  const addCartItem = useSetRecoilState(addCartItemSelector(undefined));

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantityInputValue = Number(
      event.target.value.replaceAll("/", "").replace(/\D/g, "")
    );
    const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;

    updateCartItemQuantity(newQuantity);
  };

  return (
    <>
      {quantity > 0 ? (
        <ControllerWrapper>
          <CartBox>
            <QuantityControlButton
              onClick={() => {
                updateCartItemQuantity(quantity - 1);
              }}
            >
              -
            </QuantityControlButton>
            <QuantityInput value={quantity} onChange={handleChangeQuantity} />
            <QuantityControlButton
              onClick={() => {
                updateCartItemQuantity(quantity + 1);
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
