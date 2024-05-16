import React from "react";
import { useRecoilValue } from "recoil";
import { isSelectedState } from "../../recoil/atoms/atoms";
import { cartItemsState } from "../../recoil/selectors/selectors";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { Wrapper } from "./style";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useRecoilValue(cartItemsState);
  const isSelected = useRecoilValue(isSelectedState);
  const disabledButton =
    Object.values(isSelected).every((isSelect) => !isSelect) ||
    cartItems.length === 0 ||
    location.pathname === "/cart-confirm";

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
