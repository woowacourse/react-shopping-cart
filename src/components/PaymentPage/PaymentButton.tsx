import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../common/Button";

import { useSelectedCartItemCount } from "../../hooks/useSelectedCartItemCount";
import { useRefreshCartItems } from "../../hooks/useRefreshCartItems";
import { ROUTE_PATH } from "../../constants/routePath";
import { createOrder } from "../../api/orders";
import { selectedCartItemIdsState } from "../../recoil/selectedCartItemIds";

export interface PaymentButtonProps {
  totalPayAmount: number;
}

export default function PaymentButton({ totalPayAmount }: PaymentButtonProps) {
  const navigate = useNavigate();
  const [selectedCartItemIds, setSelectedCartItemIds] = useRecoilState(selectedCartItemIdsState);
  const { selectedCartItemCount, selectedUniqueCartItemCount } = useSelectedCartItemCount();
  const refreshCartItems = useRefreshCartItems();

  const resetCartItemSelection = () => setSelectedCartItemIds([]);

  const routeToCheckout = () => {
    navigate(ROUTE_PATH.checkout, {
      state: {
        boughtItemCount: selectedCartItemCount,
        uniqueBoughtItemCount: selectedUniqueCartItemCount,
        totalPayAmount,
      },
    });
  };

  const onPayButtonClick = async () => {
    await createOrder(selectedCartItemIds);
    refreshCartItems();
    resetCartItemSelection();
    routeToCheckout();
  };

  return <S.PayButton onClick={onPayButtonClick}>결제하기</S.PayButton>;
}

const S = {
  PayButton: styled(Button)`
    position: absolute;
    bottom: 0;
    left: 0;
  `,
};
