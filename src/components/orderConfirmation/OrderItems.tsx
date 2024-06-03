import { useRecoilValue } from "recoil";
import { css } from "@emotion/css";

import { checkedCartItemsSelector } from "../../recoil/selector/selector";
import OrderItem from "./OrderItem";

const OrderItems = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);

  return (
    <div className={orderItemsCSS}>
      {checkedCartItems.map((item) => (
        <OrderItem
          key={item.id}
          product={item}
        />
      ))}
    </div>
  );
};

export default OrderItems;

const orderItemsCSS = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
