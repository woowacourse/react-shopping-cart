import styled from 'styled-components';
import { PC_WIDTH } from '../../constants/appInfo';

const Main = styled.main`
  max-width: ${PC_WIDTH};
  padding: 4rem 0;
  margin: 5rem auto 0 auto;
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}

  @media only screen and (max-width: ${PC_WIDTH}) {
    padding: 3rem 2rem;
  }
`;

export default Main;
