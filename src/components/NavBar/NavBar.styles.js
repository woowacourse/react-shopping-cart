import styled from '@emotion/styled';

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 80px;
  background-color: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const ButtonContainer = styled.div`
  & > *:not(:last-child) {
    margin-right: 40px;
  }

  & > a {
    cursor: pointer;
    color: white;
  }
`;

export { Container, ButtonContainer };
