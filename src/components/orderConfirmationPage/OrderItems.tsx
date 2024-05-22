import { css } from "@emotion/css";
import useCartChecked from "../../hooks/useCartItemChecks";
import { Splitter } from "../default";
import { Product } from "../../types/product";
import OrderItem from "./OrderItem";

const OrderItems = () => {
  const { cartItems, checkedIds } = useCartChecked();

  const filterCheckedItems = (cartItems: Product[], checkedIds: number[]): Product[] => {
    return cartItems.filter((item) => checkedIds.includes(item.id));
  };

  const checkedCartItems = filterCheckedItems(cartItems, checkedIds);

  return (
    <div className={cardItemsCSS}>
      <div>
        {checkedCartItems.map((item) => (
          <div key={item.id}>
            <Splitter />
            <OrderItem product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItems;

const cardItemsCSS = css`
  width: 100%;
`;
