import { styled } from 'styled-components';

import { Text } from '../../common/Text/Text.styles';

const CartListHeaderContainer = styled.header`
  padding-bottom: ${({ theme }) => theme.spacer.spacing3};
  display: flex;
  align-items: center;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray4};
`;

const CartItemAllSelectText = styled(Text)`
  margin-left: ${({ theme }) => theme.spacer.spacing3};
`;

const CartItemPartialSelectDeleteButton = styled(Text)`
  margin-left: ${({ theme }) => theme.spacer.spacing3};
  background-color: transparent;
  font-weight: inherit;
  outline: 0;
  border: none;
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.color.gray4};
  }
`;

const VerticalLine = styled.div`
  height: 16px;
  margin-left: ${({ theme }) => theme.spacer.spacing3};
  border-left: 1px solid ${({ theme }) => theme.color.gray2};
`;

export {
  CartListHeaderContainer,
  CartItemAllSelectText,
  CartItemPartialSelectDeleteButton,
  VerticalLine,
};
