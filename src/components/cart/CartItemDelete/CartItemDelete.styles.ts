import { styled } from 'styled-components';

import { Button } from '../../common/Button/Button.styles';
import { Text } from '../../common/Text/Text.styles';

const CartItemDeleteContainer = styled.div`
  width: 300px;
`;

const CartItemDeleteMessage = styled(Text)`
  margin: ${({ theme }) => theme.spacer.spacing4};
  padding: ${({ theme }) => theme.spacer.spacing3} 0;
  font-weight: 600;
  text-align: center;
`;

const CartItemDeleteButtonContainer = styled.div`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.color.gray2};

  & button {
    &:focus {
      outline: 0;
      box-shadow: none;
    }
  }
`;

const CartItemDeleteCancelButton = styled(Button)`
  border-right: 1px solid ${({ theme }) => theme.color.gray2};
  border-radius: 0 0 0 ${({ theme }) => theme.borderRadius.medium};
`;

const CartItemDeleteButton = styled(Button)`
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.medium} 0;
`;

export {
  CartItemDeleteContainer,
  CartItemDeleteMessage,
  CartItemDeleteButtonContainer,
  CartItemDeleteCancelButton,
  CartItemDeleteButton,
};
