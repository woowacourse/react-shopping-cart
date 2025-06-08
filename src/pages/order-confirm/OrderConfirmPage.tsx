import { useNavigate } from "react-router-dom";
import { getShoppingCartData } from "../../api/cart";
import { Header } from "../../components/common";
import BackArrowButton from "../../components/common/BackArrowButton";
import { useAPIDataContext } from "../../context/APIDataProvider";
import { useOrderListContext } from "../../context/OrderListProvider";
import { useOrderCalculation } from "../../hooks/order/useOrderCalculation";
import PayContents from "./order-contents/pay-contents/PayContents";
import OrderContents from "./order-contents/OrderContents";

const OrderConfirmPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  const { data: cartListData } = useAPIDataContext({
    name: "cart",
    fetcher: getShoppingCartData,
  });
  const { selectionMap } = useOrderListContext(cartListData);
  const { typeCount, totalCount } = useOrderCalculation(
    cartListData,
    selectionMap
  );

  return (
    <>
      <Header left={<BackArrowButton onClick={handleBackClick} />} />
      <OrderContents typeCount={typeCount} totalCount={totalCount} />
      <PayContents />
    </>
  );
};

export default OrderConfirmPage;
