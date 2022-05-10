import styled from 'styled-components';
import MenuItem from 'components/MenuItem/MenuItem';
import bigCart from '../../../assets/svg/bigCart.svg';

const Header = () => {
  return (
    <Styled.Wrapper>
      <Styled.Logo>
        <Styled.LogoImage src={bigCart} alt="로고" />
        <Styled.LogoText>WOOWA SHOP</Styled.LogoText>
      </Styled.Logo>
      <Styled.MenuContainer>
        <MenuItem>장바구니</MenuItem>
        <MenuItem>주문목록</MenuItem>
      </Styled.MenuContainer>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.header`
    display: flex;
    width: 100%;
    height: 80px;
    background: #2ac1bc;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 30%);
    justify-content: space-around;
  `,

  Logo: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  `,

  LogoImage: styled.img`
    width: 50px;
    height: 44px;
  `,

  LogoText: styled.span`
    padding: 15px 20px 10px 20px;
    font-size: 40px;
    font-weight: 900;
  `,

  MenuContainer: styled.div`
    display: flex;
    gap: 15px;
  `,
};

export default Header;
