import ShoppingCart from 'components/@shared/ShoppingCart';
import styled from 'styled-components';

function Logo() {
  return (
    <StyledLogo>
      <ShoppingCart width="40" height="40" fill="white" />
      <h1>나만 알고 싶은 짱구 스토어</h1>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;

  color: inherit;

  font-size: 25px;
  font-weight: 900;
`;

export default Logo;
