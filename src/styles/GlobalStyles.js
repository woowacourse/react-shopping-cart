import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    font-family: Noto Sans CJK KR, sans-serif;
    letter-spacing: -0.03px; 
    
  }
`;

export const Position = styled.div`
  ${({ position = 'relative', top, bottom, left, right }) => css`
    position: ${position};
    top: ${top};
    bottom: ${bottom};
    left: ${left};
    right: ${right};
  `}
`;
