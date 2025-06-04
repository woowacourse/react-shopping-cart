import Button from "../../../../components/Button/Button";
import { CheckBox } from "../../../../components/CheckBox/CheckBox";
import { Line } from "../../../../components/Line/Line";
import { CartItemTypes } from "../../types/cartItem";
import { CartProduct } from "../CartProduct/CartProduct";
import {
  CartItemBox,
  CartItemHeader,
  CartProductContainerLayout,
  CartProductList,
  SelectAllLayout,
} from "./CartProductContainer.style";

interface CartProductContainerProps {
  cartItem: CartItemTypes[];
  selectedCartIds: string[];
  onDelete: (id: string) => Promise<void>;
  updateCartItem: () => void;
  handleCheckBox: (id: string) => void;
}

export default function CartProductContainer({
  cartItem,
  selectedCartIds,
  onDelete,
  updateCartItem,
  handleCheckBox,
}: CartProductContainerProps) {
  return (
    <>
      <div css={CartProductContainerLayout}>
        <div css={SelectAllLayout}>
          <CheckBox
            isChecked={
              selectedCartIds.length === cartItem.length &&
              cartItem.length !== 0
            }
            dataTestId="select-all"
            id="select-all"
            onChange={handleCheckBox}
          />
          <label htmlFor="select-all">전체 선택</label>
        </div>
        <section css={CartProductList}>
          {cartItem.map((item) => {
            return (
              <div css={CartItemBox}>
                <Line />
                <div css={CartItemHeader}>
                  <CheckBox
                    dataTestId={`select-${item.id}`}
                    isChecked={selectedCartIds.includes(item.id.toString())}
                    onChange={handleCheckBox}
                    id={item.id.toString()}
                  />
                  <Button
                    onClick={async () => {
                      await onDelete(item.id.toString());
                      updateCartItem();
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
                  onChange={updateCartItem}
                />
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
