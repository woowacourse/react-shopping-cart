import styled from 'styled-components';

const Main = styled.main`
  max-width: 1300px;
  margin: 4rem auto;
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}

  @media only screen and (max-width: 1300px) {
    padding: 0 2rem;
  }
`;

export default Main;
