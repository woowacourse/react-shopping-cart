import styled from 'styled-components';
import { GiShoppingCart } from 'react-icons/gi';
import { BASE_COMPONENT, StyledLink } from './common';

function Header() {
  return (
    <StyledHeader>
      <StyledHeaderWrapper>
        <StyledTitleWrapper>
          <GiShoppingCart />
          <StyledTitle>
            <StyledLink to={'/'}>WOOWA SHOP</StyledLink>
          </StyledTitle>
        </StyledTitleWrapper>
        <StyledNavWrapper>
          <StyledNavButton>
            <StyledLink to={'cart'}>장바구니</StyledLink>
          </StyledNavButton>
          <StyledNavButton>
            <StyledLink to={'products'}>주문목록</StyledLink>
          </StyledNavButton>
        </StyledNavWrapper>
      </StyledHeaderWrapper>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  top: 0;
  background: ${({ theme }) => theme.COLORS.PRIMARY};
  box-shadow: ${({ theme }) => `0px 4px 4px ${theme.COLORS.BOX_SHADOW}`};
`;

const StyledHeaderWrapper = styled(BASE_COMPONENT.flexCenterWrapper)`
  justify-content: space-between;
  width: 80%;
`;

const StyledTitleWrapper = styled(BASE_COMPONENT.flexWrapper)`
  font-weight: 900;
  font-size: 40px;
  text-align: center;
  color: ${({ theme }) => theme.COLORS.WHITE};
  cursor: pointer;
`;

const StyledTitle = styled.span`
  margin-left: 12px;
`;

const StyledNavWrapper = styled(BASE_COMPONENT.flexWrapper)``;

const StyledNavButton = styled.button`
  margin: 0 5px;
  border: none;
  background: none;
  font-weight: 500;
  font-size: 18px;
  color: ${({ theme }) => theme.COLORS.WHITE};
`;

export default Header;
