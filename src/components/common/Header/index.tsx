import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { cartItemLengthSelector } from '@recoil/selectors/cartSelector';
import { HEADER_LOGO } from '@assets/images';
import { theme } from '@styles/theme';

const Header = () => {
  const cartLength = useRecoilValue(cartItemLengthSelector);
  const navigate = useNavigate();

  const goToMainPage = () => {
    navigate('/');
  };

  const goToCartPage = () => {
    navigate('/Cart');
  };
  return (
    <HeaderWrapper>
      <HeaderContainer onClick={goToMainPage}>
        <Logo src={HEADER_LOGO} alt="헤더 로고" />
        <LogoTitle>SHOP</LogoTitle>
      </HeaderContainer>
      <HeaderContainer onClick={goToCartPage}>
        <BucketText>장바구니</BucketText>
        <BucketCount>{cartLength}</BucketCount>
      </HeaderContainer>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;

  width: 100vw;
  height: 80px;

  padding: 0 40px;

  background: ${theme.colors.primaryBlack};

  z-index: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const LogoTitle = styled.h2`
  margin: 12px 0 0 20px;

  font-weight: 900;
  font-size: 40px;

  color: ${theme.colors.white};

  @media (max-width: 480px) {
    display: none;
  }
`;

const Logo = styled.img`
  width: 50px;
  height: 44px;
`;

const BucketText = styled.h3`
  margin-right: 10px;

  font-weight: 500;
  font-size: 24px;

  color: ${theme.colors.white};
`;

const BucketCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 26px;
  height: 26px;

  border-radius: 50%;

  background: ${theme.colors.green};
  color: ${theme.colors.white};
`;

export default Header;
