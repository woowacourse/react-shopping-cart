import styled from 'styled-components';

export const Wrapper = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  img {
    width: ${({ width }) => width};
    height: ${({ height }) => height};
  }
`;
