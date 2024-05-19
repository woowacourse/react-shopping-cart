import { COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const BasicButton = styled.button`
  background-color: ${COLOR.gray};
  color: ${COLOR.black};
  &:hover {
    background-color: ${COLOR.black};
    color: ${COLOR.white};
  }

  border-radius: 20px;
  padding: 14px 16px;
`;
