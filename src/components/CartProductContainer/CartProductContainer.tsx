import { useState } from "react";
import deleteShoppingCart from "../../api/deleteShoppingCart";
import { CartItemTypes } from "../../types/cartItem";
import Button from "../Button/Button";
import { CartProduct } from "../CartProduct/CartProduct";
import { CheckBox } from "../CheckBox/CheckBox";
import { Line } from "../Line/Line";
import {
  CartItemBox,
  CartItemHeader,
  CartProductContainerLayout,
  SelectAllLayout,
} from "./CartProductContainer.style";

interface CartProductContainerProps {
  cartItem: CartItemTypes[];
  onChange: () => void;
  onError: (message: string) => void;
}

export default function CartProductContainer({
  cartItem,
  onChange,
  onError,
}: CartProductContainerProps) {
  const [selectedCartId, setSelectedCartId] = useState<string[]>([]);

  const handleCheckBox = (id: string) => {
    if (id === "select-all") {
      if (selectedCartId.length === 0) {
        setSelectedCartId(cartItem.map((item) => item.id.toString()));
      } else setSelectedCartId([]);
      return;
    }
    if (selectedCartId.includes(id)) {
      setSelectedCartId(selectedCartId.filter((itemId) => itemId !== id));
    } else {
      setSelectedCartId([...selectedCartId, id]);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteShoppingCart(20);
      onChange();
    } catch (error) {
      onError("삭제에 실패했습니다");
    }
  };

  return (
    <>
      <div css={CartProductContainerLayout}>
        <div css={SelectAllLayout}>
          <CheckBox
            isChecked={selectedCartId.length === cartItem.length}
            id="select-all"
            onChange={handleCheckBox}
          />
          <label htmlFor="select-all">전체 선택</label>
        </div>
        {cartItem.map((item) => {
          return (
            <section css={CartItemBox}>
              <Line />
              <div css={CartItemHeader}>
                <CheckBox
                  isChecked={selectedCartId.includes(item.id.toString())}
                  onChange={handleCheckBox}
                  id={item.id.toString()}
                />
                <Button onClick={() => handleDelete(item.id)} style="ghost">
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
                onChange={onChange}
                maxQuantity={100000}
              />
            </section>
          );
        })}
      </div>
    </>
  );
}
