import React from "react";
import Button from "../../../../components/Button/Button";
import { CheckBox } from "../../../../components/CheckBox/CheckBox";
import { Line } from "../../../../components/Line/Line";
import { useCart } from "../../context/cartProvider";
import { CartProduct } from "../CartProduct/CartProduct";
import {
  CartItemBox,
  CartItemHeader,
  CartProductContainerLayout,
  CartProductList,
  SelectAllLayout,
} from "./CartProductContainer.style";

interface CartProductContainerProps {
  selectedCartIds: string[];
  onDelete: (id: string) => Promise<void>;
  handleCheckBox: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CartProductContainer({
  selectedCartIds,
  onDelete,
  handleCheckBox,
}: CartProductContainerProps) {
  const { getCartItemData, cartItems } = useCart();

  return (
    <>
      <div css={CartProductContainerLayout}>
        <div css={SelectAllLayout}>
          <CheckBox
            isChecked={
              selectedCartIds.length === cartItems.length &&
              cartItems.length !== 0
            }
            dataTestId="select-all"
            id="select-all"
            handleCheckBox={handleCheckBox}
          />
          <label htmlFor="select-all">전체 선택</label>
        </div>
        <section css={CartProductList}>
          {cartItems.map((item) => {
            return (
              <div css={CartItemBox}>
                <Line />
                <div css={CartItemHeader}>
                  <CheckBox
                    dataTestId={`select-${item.id}`}
                    isChecked={selectedCartIds.includes(item.id.toString())}
                    handleCheckBox={handleCheckBox}
                    id={item.id.toString()}
                  />
                  <Button
                    onClick={async () => {
                      await onDelete(item.id.toString());
                      getCartItemData();
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
                  quantity={item.quantity}
                />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
