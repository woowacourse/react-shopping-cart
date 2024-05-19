import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { cartItemsState } from "../../stores/cartItems";
import { isAnyCartItemSelectedState } from "../../stores/cartItemSelected";

import Button from "../common/Button";
import { Wrapper } from "./style";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = useRecoilValue(cartItemsState);
  const isAnyCartItemSelected = useRecoilValue(isAnyCartItemSelectedState);

  const disabledButton =
    location.pathname === "/cart-confirm" ||
    cartItems.length === 0 ||
    !isAnyCartItemSelected;

  const handleClick = () => {
    if (location.pathname === "/") {
      navigate("/cart-confirm");
    }
  };

  return (
    <Wrapper>
      <Button
        onClick={handleClick}
        $theme={disabledButton ? "disabled" : "black"}
        $size="full"
        $borderRadius="0"
        disabled={disabledButton ? true : false}
      >
        {location.pathname === "/" ? "주문 확인" : "결제하기"}
      </Button>
    </Wrapper>
  );
};

export default Footer;
