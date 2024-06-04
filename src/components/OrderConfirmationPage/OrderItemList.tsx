import { css } from "@emotion/css";
import OrderItem from "./OrderItem";
import Splitter from "../default/Splitter";

import { useRecoilValue } from "recoil";
import { cartItemSelectedSelector } from "../../recoil/cart/cartItemState";

const OrderItemList = () => {
  const cartItemSelectedSet = useRecoilValue(cartItemSelectedSelector);

  return (
    <div className={cardItemCSS}>
      <div>
        {[...cartItemSelectedSet].map((item) => (
          <div key={item.id}>
            <Splitter />
            <OrderItem product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemList;

const cardItemCSS = css`
  width: 100%;
`;

const allCheckContainerCSS = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;
