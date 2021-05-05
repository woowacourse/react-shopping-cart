import styled from '@emotion/styled';

const Container = styled.div`
  svg {
    transform: ${({ scale }) => scale && `scale(${scale})`};
  }
`;

export { Container };
