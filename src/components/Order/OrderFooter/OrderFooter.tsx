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
      alert("주문 실패했습니다. 잠시 후 다시 시도해 주세요.");
      return;
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
