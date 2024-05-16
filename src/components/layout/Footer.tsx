import { css } from "@emotion/css";

interface FooterPrps {
  text: string;
  isActive: boolean;
  onClick?: () => void;
}

const Footer = ({ text, isActive, onClick }: FooterPrps) => {
  return (
    <footer className={footerCSS(isActive)} onClick={isActive ? onClick : undefined}>
      {text}
    </footer>
  );
};

export default Footer;

const footerCSS = (isActive: boolean) => css`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 429px;
  height: 64px;
  padding: 0 24px;
  cursor: ${isActive ? "pointer" : "not-allowed"};
  background-color: ${isActive ? "#000000" : "#BEBEBE"};

  color: #ffffff;
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
`;
