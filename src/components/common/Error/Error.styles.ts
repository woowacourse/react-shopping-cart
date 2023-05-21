import styled from 'styled-components';

import { Button } from '../Button/Button.styles';
import { Heading } from '../Heading/Heading.styles';
import { Text } from '../Text/Text.styles';

const ErrorWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const ErrorContentContainer = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);

  & > * {
    text-align: center;
  }
`;

const ErrorImage = styled.img`
  width: 200px;
  height: 200x;
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};
`;

const ErrorHeading = styled(Heading)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing2};
  font-weight: 600;
`;

const ErrorBodyText = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing2};
`;

const ErrorResetButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacer.spacing3};
  width: 250px;
`;

export {
  ErrorWrapper,
  ErrorContentContainer,
  ErrorImage,
  ErrorHeading,
  ErrorBodyText,
  ErrorResetButton,
};
