import { useLocation } from 'react-router';

const useOrderPayment = () => {
  const { state } = useLocation();
  const { orderPaymentItemList, orderPaymentTotalPrice } = state;

  return {
    orderPaymentItemList,
    orderPaymentTotalPrice,
  };
};

export default useOrderPayment;
