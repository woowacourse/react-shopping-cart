import { useNavigate } from "react-router-dom";
import { selectedCartItemIdsState } from "../../recoil/selectedCartItemIds";
import { useRecoilState } from "recoil";
import { useSelectedCartItemCounts } from "../../hooks/useSelectedCartItemCounts";
import { ROUTE_PATH } from "../../constants/routePath";
import Button from "../common/Button";
import styled from "styled-components";
import { createOrder } from "../../api/orders";
import { useRefreshCartItems } from "../../hooks/useRefreshCartItems";

export interface PaymentButtonProps {
  totalPayAmount: number;
}

export default function PaymentButton({ totalPayAmount }: PaymentButtonProps) {
  const navigate = useNavigate();
  const [selectedCartItemIds, setSelectedCartItemIds] = useRecoilState(selectedCartItemIdsState);
  const { selectedCartItemsCount, selectedUniqueCartItemsCount } = useSelectedCartItemCounts();
  const refreshCartItems = useRefreshCartItems();

  const resetCartItemSelection = () => setSelectedCartItemIds([]);

  const routeToCheckout = () => {
    navigate(ROUTE_PATH.checkout, {
      state: {
        boughtItemsCount: selectedCartItemsCount,
        uniqueBoughtItemsCount: selectedUniqueCartItemsCount,
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
