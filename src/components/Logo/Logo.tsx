import ShoppingCart from 'assets/shoppingCart';
import styled from 'styled-components';

function Logo() {
  return (
    <StyledLogo>
      <ShoppingCart width="51" height="44" fill="white" />
      <h1>WOOWA SHOP</h1>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 20px;
  font-size: 40px;
  font-weight: 900;
  color: inherit;
`;

export default Logo;
