import { useState } from "react";
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
import { CartItemTypes } from "../../types/cartItem";

// const cartItem = [
//   {
//     id: 7124,
//     quantity: 2,
//     product: {
//       id: 25,
//       name: "얌샘김밥",
//       price: 5000,
//       imageUrl:
//         "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20171018_6%2F1508253136417Dlrjh_PNG%2FCdq22zpVpr92_XHROlHbxjJ0.png&type=sc960_832",
//       category: "식료품",
//     },
//   },
//   {
//     id: 7161,
//     quantity: 1,
//     product: {
//       id: 27,
//       name: "아바라",
//       price: 4800,
//       imageUrl:
//         "https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/cards/snapshots/171653801239329270.jpeg?w=256&h=366&c=c",
//       category: "식료품",
//     },
//   },
// ];

interface CartProductContainerProps {
  cartItem: CartItemTypes[];
}
export default function CartProductContainer({
  cartItem,
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
                <Button onClick={() => {}} style="ghost">
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
                onChange={() => {}}
                maxQuantity={100000}
              />
            </section>
          );
        })}
      </div>
    </>
  );
}
