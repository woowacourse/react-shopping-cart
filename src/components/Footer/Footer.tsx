/** @jsxImportSource @emotion/react */
import { useRecoilValue } from "recoil";
import { FooterStyle } from "./Footer.style";
import { orderAmountState } from "../../store/selector/selectors";

const Footer = () => {
  const orderAmount = useRecoilValue(orderAmountState);
  console.log(orderAmount);
  return (
    <button disabled={orderAmount === 0} css={FooterStyle}>
      주문 확인
    </button>
  );
};

export default Footer;
