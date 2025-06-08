import { useNavigate } from "react-router-dom";
import { Header } from "../../components/common";
import BackArrowButton from "../../components/common/BackArrowButton";
import OrderContents from "./order-contents/OrderContents";
import PayContents from "./order-contents/pay-contents/PayContents";
import { CouponProvider } from "./context/CouponProvider";

const OrderConfirmPage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <CouponProvider>
      <Header left={<BackArrowButton onClick={handleBackClick} />} />
      <OrderContents />
      <PayContents />
    </CouponProvider>
  );
};

export default OrderConfirmPage;
