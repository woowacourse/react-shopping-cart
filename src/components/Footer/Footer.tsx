import { useRecoilValue } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";

import { FooterStyle } from "./Footer.style";

import { orderAmountState } from "@/store/selector/selectors";

import { RoutePaths, RoutesObject } from "@/App";

interface FooterInfo {
  content: string;
  isButtonDisabled: boolean;
  handleClick: () => void;
}

const Footer = () => {
  const orderAmount = useRecoilValue(orderAmountState);
  const location = useLocation();
  const pathname = location.pathname as RoutePaths;
  const navigate = useNavigate();

  const footerInfo: RoutesObject<FooterInfo> = {
    "/": {
      content: "주문 확인",
      isButtonDisabled: orderAmount === 0,
      handleClick: () => navigate("/order"),
    },
    "/order": {
      content: "결제하기",
      isButtonDisabled: true,
      handleClick: () => navigate(0),
    },
  };

  return (
    <footer>
      <button
        disabled={footerInfo[pathname].isButtonDisabled}
        css={FooterStyle}
        onClick={footerInfo[pathname].handleClick}
      >
        {footerInfo[pathname].content}
      </button>
    </footer>
  );
};

export default Footer;
