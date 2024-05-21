/** @jsxImportSource @emotion/react */
import OrderContainer from "../OrderContainer/OrderContainer";
import OrderResults from "../OrderResults/OrderResults";
import OrderTitle from "../OrderTitle/OrderTitle";
import { OrderContentStyle } from "./OrderContent.style";

const OrderContent = () => {
  return (
    <main css={OrderContentStyle}>
      <OrderTitle />
      <OrderContainer />
      <OrderResults />
    </main>
  );
};

export default OrderContent;
