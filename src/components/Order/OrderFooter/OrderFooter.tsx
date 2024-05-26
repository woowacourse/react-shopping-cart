/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import { OrderFooterStyle } from "./OrderFooter.style";
import { generateOrder } from "../../../store/api";
import { useRecoilValue } from "recoil";
import { checkedCartItemsSelector } from "../../../store/selector/selectors";

const OrderFooter = () => {
  const checkedItems = useRecoilValue(checkedCartItemsSelector);
  const navigate = useNavigate();

  const cartItemIds = checkedItems.map((item) => item.id);

  const handleClickOrder = async () => {
    const response = await generateOrder(cartItemIds);
    if (response === 201) {
      localStorage.clear();
    } else {
      console.error("Failed to generate orders", response);
    }

    navigate("/payment");
  };

  return (
    <button disabled={false} css={OrderFooterStyle} onClick={handleClickOrder}>
      결제하기
    </button>
  );
};

export default OrderFooter;
