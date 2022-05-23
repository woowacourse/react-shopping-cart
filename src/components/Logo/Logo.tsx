import styled from 'styled-components';
import ICONS from '../../constants/icons';

function Logo() {
  return (
    <StyledLogo>
      {ICONS.LOGO}
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

  ${({ theme: { media } }) => media.sm`
    h1 {
      display: none;
    }
  `};
`;

export default Logo;
