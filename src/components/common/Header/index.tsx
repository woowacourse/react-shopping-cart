import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { cartAtom } from '@recoil/atoms/cartAtom';
import { HEADER_LOGO } from '@assets/images';
import { theme } from '@styles/theme';

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

  width: 100vw;
  height: 80px;

  padding: 0 300px;

  background: ${theme.colors.primaryBlack};

  z-index: 1;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const LogoTitle = styled.h2`
  margin: 12px 0 0 20px;

  font-weight: 900;
  font-size: 40px;

  color: ${theme.colors.white};
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
