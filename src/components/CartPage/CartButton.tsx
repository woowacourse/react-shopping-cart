import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants/routePath";
import Button from "../common/Button";
import { useRecoilValue } from "recoil";
import { selectedCartItemIdsState } from "../../recoil/selectedCartItemIds";

interface CartButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export default function CartButton(attributes: CartButtonProps) {
  const navigate = useNavigate();
  const selectedCartItemIds = useRecoilValue(selectedCartItemIdsState);
  const isDisabled = selectedCartItemIds.length === 0;

  const onOrderConfirmButtonClick = () => navigate(ROUTE_PATH.payment);

  return (
    <Button disabled={isDisabled} onClick={onOrderConfirmButtonClick} {...attributes}>
      주문 확인
    </Button>
  );
}
