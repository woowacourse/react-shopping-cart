import { useRecoilState } from "recoil";
import styled from "styled-components";

import Button from "../common/Button";

import { useSelectedCartItemCount } from "../../hooks/useSelectedCartItemCount";
import { useRefreshCartItems } from "../../hooks/useRefreshCartItems";
import { useNavigateWithQuery } from "../../hooks/useNavigateWithQuery";
import { ROUTE_PATH } from "../../constants/routePath";
import { createOrder } from "../../api/orders";
import { selectedCartItemIdsState } from "../../recoil/selectedCartItemIds";

export interface PayButtonProps {
  totalPayAmount: number;
}

export default function PayButton({ totalPayAmount }: PayButtonProps) {
  const { navigateWithQuery } = useNavigateWithQuery();
  const [selectedCartItemIds, setSelectedCartItemIds] = useRecoilState(selectedCartItemIdsState);
  const { selectedCartItemCount, selectedUniqueCartItemCount } = useSelectedCartItemCount();
  const { refreshCartItems } = useRefreshCartItems();

  const resetCartItemSelection = () => setSelectedCartItemIds([]);

  const routeToCheckout = () => {
    navigateWithQuery(ROUTE_PATH.checkout, {
      boughtItemCount: selectedCartItemCount.toString(),
      uniqueBoughtItemCount: selectedUniqueCartItemCount.toString(),
      totalPayAmount: totalPayAmount.toString(),
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
