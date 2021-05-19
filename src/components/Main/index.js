import styled from 'styled-components';

const Main = styled.main`
  max-width: 1300px;
  padding: 4rem 0;
  margin: 5rem auto 0 auto;
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}

  @media only screen and (max-width: 1300px) {
    padding: 3rem 2rem;
  }
`;

export default Main;
