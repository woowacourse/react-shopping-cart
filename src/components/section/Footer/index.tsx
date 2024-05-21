import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartItemsState } from "../../../stores/cartItems";
import { isAnyCartItemSelectedState } from "../../../stores/cartItemSelections";

import Button from "../../_common/Button";
import * as S from "./styled";
import { ROUTE_PATH } from "../../../constants/route";

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const cartItems = useRecoilValue(cartItemsState);
  const isAnyCartItemSelected = useRecoilValue(isAnyCartItemSelectedState);

  const isDisabled =
    pathname === ROUTE_PATH.cartConfirm ||
    cartItems.length === 0 ||
    !isAnyCartItemSelected;

  const buttonText = pathname === ROUTE_PATH.base ? "주문 확인" : "결제하기";

  const handleButtonClick = () => {
    if (pathname === ROUTE_PATH.base) {
      navigate(ROUTE_PATH.cartConfirm);
    }
  };

  return (
    <S.Container>
      <Button
        onClick={handleButtonClick}
        $theme={isDisabled ? "disabled" : "black"}
        $size="full"
        $borderRadius="0"
        disabled={isDisabled}
      >
        {buttonText}
      </Button>
    </S.Container>
  );
};

export default Footer;
