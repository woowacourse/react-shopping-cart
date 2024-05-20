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

  const handleOrderConfirmButtonClick = () => navigate(ROUTE_PATH.checkout);

  return (
    <Button disabled={isDisabled} onClick={handleOrderConfirmButtonClick} {...attributes}>
      주문 확인
    </Button>
  );
}
