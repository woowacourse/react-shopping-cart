import { styled } from 'styled-components';

import { Text } from '../../common/Text/Text.styles';

const CartListHeaderWrapper = styled.header`
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray4};
`;

const CartListHeaderText = styled(Text)`
  padding-bottom: ${({ theme }) => theme.spacer.spacing3};
`;

export { CartListHeaderWrapper, CartListHeaderText };
