import styled from '@emotion/styled/macro';

import FlexContainer from 'components/@common/FlexContainer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 58% 40%;
  gap: 2%;

  & > ${FlexContainer} {
    padding: 1rem 1.5rem;
  }
`;

export { Container };
