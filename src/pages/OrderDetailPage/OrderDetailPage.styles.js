import styled from '@emotion/styled';

const Container = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 75px;
  }
`;

export { Container };
