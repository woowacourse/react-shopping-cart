import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import RESPONSIVE_SIZE from 'constants/responsiveSize';

const HeaderLink = styled(Link)`
  color: ${({ theme }) => theme.usingColor.headerFont};
  cursor: pointer;
  text-decoration: none;
  ${({ type }) => {
    switch (type) {
      case 'title':
        return css`
          font-weight: 900;
          font-size: 40px;

          @media (max-width: ${RESPONSIVE_SIZE.MEDIUM}) {
            font-weight: 900;
            font-size: 25px;
          }

          @media (max-width: ${RESPONSIVE_SIZE.SMALL}) {
            font-weight: 900;
            font-size: 20px;
          }
        `;
      case 'nav':
        return css`
          font-weight: 500;
          font-size: 24px;

          @media (max-width: ${RESPONSIVE_SIZE.MEDIUM}) {
            font-weight: 500;
            font-size: 20px;
          }

          @media (max-width: ${RESPONSIVE_SIZE.SMALL}) {
            font-weight: 500;
            font-size: 16px;
          }
        `;
      default:
        return css`
          font-weight: 500;
          font-size: 24px;

          @media (max-width: ${RESPONSIVE_SIZE.MEDIUM}) {
            font-weight: 500;
            font-size: 20px;
          }

          @media (max-width: ${RESPONSIVE_SIZE.SMALL}) {
            font-weight: 500;
            font-size: 16px;
          }
        `;
    }
  }}
`;

export default HeaderLink;
