import FooterWrapper from "@/components/wrapper/Wrapper.styled";
import StyledFooter from "./Footer.styled";

function Footer() {
  return (
    <StyledFooter>
      <FooterWrapper>
        <div className="footer__info">
          <span className="footer__info__description">상호명: (주)민초샵</span>
          <span className="footer__info__description">
            이메일: (고객문의) typingjs@gmail.com
          </span>
          <span className="footer__info__description">대표이사: 민초</span>
          <span className="footer__info__description">
            주소: 서울특별시 송파구 올림픽로35다길 42 14층
          </span>
          <div className="footer__info__caution">
            ㈜민초샵은 통신판매중개자로 거래 당사자가 아니므로, 판매자가 등록한
            상품정보 및 거래 등에 대해 책임을 지지 않습니다 <br />
            단, ㈜민초샵이 판매자로 등록 판매한 상품은 판매자로서 책임을
            부담합니다
          </div>
        </div>
      </FooterWrapper>
    </StyledFooter>
  );
}

export default Footer;
