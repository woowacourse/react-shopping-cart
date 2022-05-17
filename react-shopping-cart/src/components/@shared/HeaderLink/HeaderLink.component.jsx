import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const HeaderLink = styled(Link)`
  color: ${({ theme }) => theme.colors['WHITE_001']};
  cursor: pointer;
  text-decoration: none;
  ${({ type }) => {
    switch (type) {
      case 'title':
        return css`
          font-weight: 900;
          font-size: 40px;
        `;
      case 'nav':
        return css`
          font-weight: 500;
          font-size: 24px;
        `;
      default:
        return css`
          font-weight: 500;
          font-size: 24px;
        `;
    }
  }}
`;

export default HeaderLink;
