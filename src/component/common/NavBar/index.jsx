import styled from 'styled-components';
import Button from 'component/common/Button';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'constant/path';

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(PATH.PRODUCT_LIST);
  };

  const handleShoppingCartClick = () => {
    navigate(PATH.SHOPPING_CART);
  };

  const handleOrderListClick = () => {
    return;
  };

  return (
    <StyledNavBar>
      <Button onClick={handleLogoClick}>
        <LogoText>🛒 WOOWA SHOP</LogoText>
      </Button>
      <MenuBox>
        <Button onClick={handleShoppingCartClick}>
          <MenuText>장바구니</MenuText>
        </Button>
        <Button onClick={handleOrderListClick}>
          <MenuText>주문목록</MenuText>
        </Button>
      </MenuBox>
    </StyledNavBar>
  );
}

const StyledNavBar = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  gap: 712px;
  background-color: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

const LogoText = styled.span`
  font-family: 'Noto Sans KR';
  font-weight: 900;
  font-size: 40px;
  color: #ffffff;
`;

const MenuBox = styled.div`
  display: flex;
  gap: 44px;
`;

const MenuText = styled.span`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  text-align: center;
  text-transform: capitalize;
  color: #ffffff;
`;
