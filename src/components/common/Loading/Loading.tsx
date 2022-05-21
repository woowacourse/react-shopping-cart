import styled, { css, StyleProps } from 'styled-components';

const Loading = styled.div`
  animation: rotateY 1s infinite;

  @keyframes rotateY {
    from {
      transform: rotateY(0);
    }
    to {
      transform: rotateY(360deg);
    }
  }

  ${({ fontSize = '1.5rem' }: Partial<Pick<StyleProps, 'fontSize'>>) => css`
    font-size: ${fontSize};
  `}
`;

export default Loading;
