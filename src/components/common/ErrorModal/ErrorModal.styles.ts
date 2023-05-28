import styled from 'styled-components';

import { Button } from '../Button/Button.styles';
import { Text } from '../Text/Text.styles';

const ErrorModalContentContainer = styled.div`
  width: 300px;
`;

const ErrorMessage = styled(Text)`
  margin: ${({ theme }) => theme.spacer.spacing4};
  padding: ${({ theme }) => theme.spacer.spacing3} 0;
  font-weight: 600;
  text-align: center;
`;

const ErrorModalCloseButton = styled(Button)`
  border-top: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 0 0 8px 8px;
`;

export { ErrorModalContentContainer, ErrorMessage, ErrorModalCloseButton };
