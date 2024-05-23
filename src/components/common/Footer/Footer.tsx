import { useRecoilValue } from "recoil";
import { selectedListState } from "../../../recoil/atoms/atoms";
import { cartItemsState } from "../../../recoil/atoms/atoms";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { Wrapper } from "./style";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useRecoilValue(cartItemsState);
  const selectedList = useRecoilValue(selectedListState);
  const disabledButton =
    Object.values(selectedList).every((isSelect) => !isSelect) ||
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
        disabled={disabledButton}
      >
        {location.pathname === "/" ? "주문 확인" : "결제하기"}
      </Button>
    </Wrapper>
  );
};

export default Footer;
