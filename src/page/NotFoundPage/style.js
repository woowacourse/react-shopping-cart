import {FlexColumn} from 'style/common';
import styled from 'styled-components';

const NotFoundPageLayout = styled(FlexColumn)`
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.GRAY_500};

  button {
    margin-top: 50%;
  }
`;

export {NotFoundPageLayout};
