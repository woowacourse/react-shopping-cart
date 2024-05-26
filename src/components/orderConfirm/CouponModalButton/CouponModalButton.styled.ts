import { BORDER_RADIUS, COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const CouponModalButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: ${BORDER_RADIUS};
  border: 1px solid ${COLOR.borderColor};
  text-align: center;
  color: ${COLOR.black};
  margin: 24px 0px;

  &:hover {
    background-color: ${COLOR.black};
    color: ${COLOR.white};
  }

  &:disabled {
    background-color: ${COLOR.gray};
    color: ${COLOR.white};
  }
`;
