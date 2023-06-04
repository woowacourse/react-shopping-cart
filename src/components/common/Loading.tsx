import styled, { keyframes } from 'styled-components';

type Theme = 'dark' | 'light';

interface LoadingProps {
  width?: number;
  height?: number;
  theme?: Theme;
}

export const Loading = ({ width, height, theme = 'dark' }: LoadingProps) => {
  return (
    <Container>
      <StyledLoading $width={width} $height={height} $theme={theme} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoading = styled.div<{
  $width?: number;
  $height?: number;
  $theme: Theme;
}>`
  margin: 0 8px;
  transform: translate(-50%, -50%);
  width: ${(props) => (props.$width ? `${props.$width}px` : `30px`)};
  height: ${(props) => (props.$height ? `${props.$height}px` : `30px`)};
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${(props) => (props.$theme === 'light' ? 'white' : '#333')};
  animation: ${spinnerAnimation} 1s linear infinite;
`;
