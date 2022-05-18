import Button from 'component/common/Button';
import {FlexColumn} from 'style/common';
import styled from 'styled-components';

const NotFoundPageLayout = styled(FlexColumn)`
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const HomeButton = styled(Button)`
  margin-top: 50%;
`;

export {NotFoundPageLayout, HomeButton};
