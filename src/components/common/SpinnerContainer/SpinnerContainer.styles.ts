import { styled } from 'styled-components';

import { Text } from '../Text/Text.styles';

const SpinnerContainer = styled.div`
  position: relative;
  top: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
`;

const SpinnerMessage = styled(Text)`
  font-weight: 600;
  text-align: center;
  margin-top: ${({ theme }) => theme.spacer.spacing4};
`;

export { SpinnerContainer, SpinnerMessage };
