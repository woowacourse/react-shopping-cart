import styled from '@emotion/styled';

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1080px;
  background-color: #fff;

  & > main {
    padding: 0;
  }

  & > footer {
    background-color: #fff;
    border-top: 1px solid #ddd;
  }
`;

export { Container };
