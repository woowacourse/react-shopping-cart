import { Dimmed } from '@/styles/GlobalStyles';
import ReactDOM from 'react-dom';
import styled, { css, StyleProps } from 'styled-components';

const Container = styled.div`
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

function Loading({ children, type = 'ui', ...props }) {
  if (type === 'page') {
    return ReactDOM.createPortal(
      <Dimmed>
        <Container {...props}>{children}</Container>
      </Dimmed>,
      document.querySelector('#root') as Element,
    );
  }

  return <Container {...props}>{children}</Container>;
}

export default Loading;
