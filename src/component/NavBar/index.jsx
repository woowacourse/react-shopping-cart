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
    <Styled.NavBar>
      <Button onClick={handleLogoClick}>
        <Styled.LogoText>🛒 WOOWA SHOP</Styled.LogoText>
      </Button>
      <Styled.MenuBox>
        <Button onClick={handleShoppingCartClick}>
          <Styled.MenuText>장바구니</Styled.MenuText>
        </Button>
        <Button onClick={handleOrderListClick}>
          <Styled.MenuText>주문목록</Styled.MenuText>
        </Button>
      </Styled.MenuBox>
    </Styled.NavBar>
  );
}

const Styled = {
  NavBar: styled.div`
    height: 80px;
    display: flex;
    justify-content: center;
    gap: 712px;
    background-color: #2ac1bc;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  `,

  LogoText: styled.span`
    font-family: 'Noto Sans KR';
    font-weight: 900;
    font-size: 40px;
    color: #ffffff;
  `,

  MenuBox: styled.div`
    display: flex;
    gap: 44px;
  `,

  MenuText: styled.span`
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    text-align: center;
    text-transform: capitalize;
    color: #ffffff;
  `,
};
