/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import { FooterStyle } from "./Footer.style";
import { orderAmountState } from "../../store/selector/selectors";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const orderAmount = useRecoilValue(orderAmountState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname !== "/" && pathname !== "/order") {
    return;
  }

  const footerContent = {
    "/": "주문 확인",
    "/order": "결제하기",
  };

  const footerButtonDisabled = {
    "/": orderAmount === 0,
    "/order": true,
  };

  const footerButtonClick = {
    "/": () => navigate("/order"),
    "/order": () => navigate(0),
  };

  return (
    <button disabled={footerButtonDisabled[pathname]} css={FooterStyle} onClick={footerButtonClick[pathname]}>
      {footerContent[pathname]}
    </button>
  );
};

export default Footer;
