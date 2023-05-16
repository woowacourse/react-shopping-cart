import styled from 'styled-components';

import { Text } from '../../common/Text/Text.styles';

const CartListContainer = styled.section`
  margin-top: 24px;
  width: 760px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacer.spacing4};
  justify-self: start;

  &.center {
    margin: 0;
    padding: 72px;
    justify-content: center;
    align-items: center;
    gap: initial;

    & button {
      width: 200px;
    }
  }
`;

const CartListEmptyImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: ${({ theme }) => theme.spacer.spacing3};
`;

const CartListEmptyMessage = styled(Text)`
  margin-bottom: ${({ theme }) => theme.spacer.spacing4};
  font-weight: 600;
`;

export { CartListContainer, CartListEmptyImage, CartListEmptyMessage };
