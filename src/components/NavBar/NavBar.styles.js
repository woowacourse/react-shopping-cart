import styled from '@emotion/styled';

const Container = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 80px;
  color: white;
  background-color: #2ac1bc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
`;

const LogoContainer = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 10px;
  }
  & > span {
    font-weight: 900;
  }
`;

const ButtonContainer = styled.div`
  & > *:not(:last-child) {
    margin-right: 40px;
  }

  & > * {
    cursor: pointer;
  }
`;

export { Container, LogoContainer, ButtonContainer };
