/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import { FooterStyle } from "./Footer.style";
import { orderAmountState } from "../../store/selector/selectors";
import { useLocation, useNavigate } from "react-router-dom";

interface FooterInfo {
  content: string;
  isButtonDisabled: boolean;
  handleClick: () => void;
}

const Footer = () => {
  const orderAmount = useRecoilValue(orderAmountState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const footerInfo: Record<string, FooterInfo> = {
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

  console.log(Object.keys(footerInfo), pathname);
  if (!Object.keys(footerInfo).includes(pathname)) {
    return;
  }

  return (
    <button
      disabled={footerInfo[pathname].isButtonDisabled}
      css={FooterStyle}
      onClick={footerInfo[pathname].handleClick}
    >
      {footerInfo[pathname].content}
    </button>
  );
};

export default Footer;
