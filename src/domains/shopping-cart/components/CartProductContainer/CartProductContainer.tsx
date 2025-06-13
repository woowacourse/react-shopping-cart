import React from "react";
import Button from "../../../../components/Button/Button";
import { CheckBox } from "../../../../components/CheckBox/CheckBox";
import { Line } from "../../../../components/Line/Line";
import { CartItemTypes } from "../../types/cartItem";
import { CartProduct } from "../CartProduct/CartProduct";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import {
  CartItemBox,
  CartItemHeader,
  CartProductList,
} from "./CartProductContainer.style";

interface CartProductContainerProps {
  selectedCartIds: string[];
  onDelete: (id: string) => Promise<void>;
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
  cartItems: CartItemTypes[];
  refetchCartItems: (response: Response) => Promise<void>;
}

export default function CartProductContainer({
  selectedCartIds,
  onDelete,
  handleCheckBox,
  cartItems,
  refetchCartItems,
}: CartProductContainerProps) {
  return (
    <section css={CartProductList}>
      {cartItems.map((item) => {
        return (
          <div css={CartItemBox}>
            <Line />
            <div css={CartItemHeader}>
              <CheckBox
                dataTestId={`select-${item.id}`}
                checked={selectedCartIds.includes(item.id.toString())}
                onChange={handleCheckBox}
                id={item.id.toString()}
              />
              <Button
                onClick={async () => {
                  await onDelete(item.id.toString());
                }}
                style="ghost"
              >
                삭제
              </Button>
            </div>
            <CartProduct
              key={item.id}
              id={item.id}
              imageUrl={item.product.imageUrl}
              name={item.product.name}
              price={item.product.price}
            >
              <QuantitySelector
                quantity={item.quantity}
                cartId={item.id.toString()}
                refetchCartItems={refetchCartItems}
              />
            </CartProduct>
          </div>
        );
      })}
    </section>
  );
}
