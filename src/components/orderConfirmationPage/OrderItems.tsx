import { css } from "@emotion/css";
import { Splitter } from "../default";
import OrderItem from "./OrderItem";
import { useRecoilValue } from "recoil";
import { checkedCartItemsSelector } from "../../recoil/selector/selector";

const OrderItems = () => {
  const checkedCartItems = useRecoilValue(checkedCartItemsSelector);

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
