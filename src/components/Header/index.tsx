import Logo from '@Asset/Logo.png';
import UserSummaryShoppingBasket from '@Components/UserSummaryShoppingBasket';
import styled from 'styled-components';

function Header() {
  return (
    <Container aria-label="페이지 헤더">
      <Layout>
        <LogoWrapper>
          <LogoImg src={Logo} alt="장바구니 로고" />
          <LogoText>SHOP</LogoText>
        </LogoWrapper>
        <UserSummaryShoppingBasket quantity={1} />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  background-color: #333333;
  padding: 10px 0;
`;

const Layout = styled.div`
  display: flex;
  width: 70%;
  margin: auto;
  justify-content: space-between;
`;

const LogoWrapper = styled.div`
  color: #ffffff;
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  margin-right: 15px;
  width: 40px;
`;

const LogoText = styled.span`
  position: relative;
  top: 4px;
  font-size: 40px;
  font-weight: 900;
`;

export default Header;
