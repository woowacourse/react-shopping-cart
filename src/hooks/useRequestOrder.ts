import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { selectedCartItemIdsSelector } from "@/recoil/selectedCardItems";

import { requestOrders } from "@/apis";

import CLIENT_PATH from "@/constants/path";

const useRequestOrder = () => {
  const navigate = useNavigate();
  const selectedCartItemIds = useRecoilValue(selectedCartItemIdsSelector);

  const routerToPaymentConfirmPage = () => navigate(CLIENT_PATH.paymentConfirm);

  const handleRequestOrders = async () => {
    try {
      await requestOrders(selectedCartItemIds);
      routerToPaymentConfirmPage();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return { handleRequestOrders };
};

export default useRequestOrder;
