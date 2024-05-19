import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartItemsState } from "../../../stores/cartItems";
import { isAnyCartItemSelectedState } from "../../../stores/cartItemSelected";

import Button from "../../_common/Button";
import { Wrapper } from "./style";

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const cartItems = useRecoilValue(cartItemsState);
  const isAnyCartItemSelected = useRecoilValue(isAnyCartItemSelectedState);

  const disabledButton =
    pathname === "/cart-confirm" ||
    cartItems.length === 0 ||
    !isAnyCartItemSelected;

  const buttonText = pathname === "/" ? "주문 확인" : "결제하기";

  const handleButtonClick = () => {
    if (pathname === "/") {
      navigate("/cart-confirm");
    }
  };

  return (
    <Wrapper>
      <Button
        onClick={handleButtonClick}
        $theme={disabledButton ? "disabled" : "black"}
        $size="full"
        $borderRadius="0"
        disabled={disabledButton ? true : false}
      >
        {buttonText}
      </Button>
    </Wrapper>
  );
};

export default Footer;
