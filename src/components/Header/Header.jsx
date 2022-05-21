import styled from 'styled-components';
import MenuItem from 'components/MenuItem';
import bigCart from 'assets/svg/bigCart.svg';
import { Link } from 'react-router-dom';
import Circle from 'components/Circle';
import useCart from 'hooks/useCart';

const Header = () => {
  const { cartList } = useCart();

  return (
    <Styled.Wrapper>
      <Styled.Logo to="/">
        <Styled.LogoImage src={bigCart} alt="로고" />
        <Styled.LogoText>WOOWA SHOP</Styled.LogoText>
      </Styled.Logo>
      <Styled.MenuContainer>
        <MenuItem to="/cart">
          장바구니<Circle>{cartList.length}</Circle>
        </MenuItem>
        <MenuItem to="/order">주문목록</MenuItem>
      </Styled.MenuContainer>
    </Styled.Wrapper>
  );
};

const Styled = {
  Wrapper: styled.header`
    display: flex;
    width: 100vw;
    height: 80px;
    background: #2ac1bc;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 30%);
    justify-content: space-around;
  `,
  Logo: styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-decoration-line: none;
  `,
  LogoImage: styled.img`
    ${({ theme }) => `
      @media ${theme.DEVICE.EXTRA_SMALL} {
        width: 25px;
        height: 22px;
      }
      @media ${theme.DEVICE.MOBILE} {
        width: 35px;
        height: 31px;
      }
      @media ${theme.DEVICE.TABLET} {
        width: 45px;
        height: 40px;
      }
      @media ${theme.DEVICE.LAPTOP} {
        width: 50px;
        height: 44px;
      }
    `}
  `,

  LogoText: styled.span`
    ${({ theme }) => `
      font-weight: 900;
      @media ${theme.DEVICE.EXTRA_SMALL} {
        padding: 5px 8px;
        font-size: 20px;
      }
      @media ${theme.DEVICE.MOBILE} {
        padding: 8px 12px;
        font-size: 26px;
      }
      @media ${theme.DEVICE.TABLET} {
        padding: 10px 15px;
        font-size: 35px;
      }
      @media ${theme.DEVICE.LAPTOP} {
        padding: 15px 20px;
        font-size: 40px;
      }
    `}
  `,
  MenuContainer: styled.div`
    display: flex;
    gap: 15px;
  `,
};

export default Header;
