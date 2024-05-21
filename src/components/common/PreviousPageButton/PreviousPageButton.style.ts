import styled from '@emotion/styled';
import { BackArrowIcon } from '../../../assets';

export const PreviousPageButton = styled.button`
  width: 32px;
  height: 32px;
  background: url('${BackArrowIcon}') no-repeat center;
  background-size: auto;
  cursor: pointer;

  &:hover {
    animation: bounce 0.2s cubic-bezier(0, 0, 0.18, 0.99) 2 alternate;
  }

  @keyframes bounce {
    to {
      transform: translateX(-5px);
    }
  }
`;
