import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { flexCenter } from 'styles/mixin';
import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';

const Header = () => {
  const navigate = useNavigate();

  return (
    <StyledRoot>
      <div>
        <Link to='/main/1'>
          <StyledLogo>
            <CartIcon fill='white' />
            <StyledBrandName>RoyStin Shop</StyledBrandName>
          </StyledLogo>
        </Link>
        <StyledNav>
          <button onClick={() => navigate('/cart')}>장바구니</button>
          <button>주문목록</button>
        </StyledNav>
      </div>
    </StyledRoot>
  );
};

export default Header;

const StyledRoot = styled.header`
  width: 100%;
  height: 8rem;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 6rem;
  ${flexCenter}

  & > div {
    width: ${({ theme }) => theme.size.fullContentWidth};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledLogo = styled.div``;

const StyledBrandName = styled.span`
  color: white;
  font-size: 4rem;
  font-weight: 900;
  margin-left: 1rem;
`;

const StyledNav = styled.nav`
  & > button {
    color: white;
    font-size: 2.4rem;
    background-color: inherit;
  }

  & > button + button {
    margin-left: 4.4rem;
  }
`;
