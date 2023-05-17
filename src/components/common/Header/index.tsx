import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { HEADER_LOGO } from '@assets/images';
import { device, theme } from '@styles/theme';

const Header = () => {
  const [cart] = useRecoilState(cartAtom);

  return (
    <Wrapper>
      <Container>
        <Logo src={HEADER_LOGO} alt="헤더 로고" />
        <LogoTitle>SHOP</LogoTitle>
      </Container>
      <Container>
        <BucketText>장바구니</BucketText>
        <BucketCount>{cart.length}</BucketCount>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;

  width: 100%;
  height: 80px;

  padding: 0 20%;

  background: ${theme.colors.primaryBlack};

  z-index: 1;

  @media ${device.mobileS} {
    padding: 0 5%;
  }

  @media ${device.laptopL} {
    padding: 0 10%;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoTitle = styled.h2`
  margin: 12px 0 0 20px;

  font-weight: 900;
  font-size: 40px;

  color: ${theme.colors.white};

  @media ${device.mobileS} {
    display: none;
  }

  @media ${device.mobileL} {
    margin: 9px 0 0 15px;
    font-size: 28px;
  }
`;

const Logo = styled.img`
  height: 44px;

  @media ${device.mobileS} {
    height: 22px;
  }

  @media ${device.mobileL} {
    height: 33px;
  }
`;

const BucketText = styled.h3`
  margin-right: 10px;

  font-weight: 500;
  font-size: 24px;

  color: ${theme.colors.white};

  @media ${device.mobileS} {
    margin-right: 6px;
    font-size: 16px;
  }

  @media ${device.mobileL} {
    margin-right: 8px;
    font-size: 20px;
  }
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

  @media ${device.mobileS} {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
`;

export default Header;
