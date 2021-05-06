import styled from 'styled-components';
import PALETTE from '../../../constants/palette';

export const HighlightText = styled.span`
  font-weight: 600;
  box-shadow: inset 0 -0.4rem 0 0 ${({ highlightColor }) => highlightColor};

  /* &:after {
    content: '';
    display: block;
    width: inherit;
    height: 20px;
    background-color: ${({ highlightColor }) => highlightColor};
  } */
`;
