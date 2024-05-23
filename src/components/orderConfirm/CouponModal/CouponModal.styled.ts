import { BORDER_RADIUS, COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const ModalHeader = styled.section`
  display: flex;
  justify-content: space-between;
`;

export const ModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  line-height: 26.06px;
  text-align: left;
`;

export const CouponList = styled.section`
  height: 50vh;
  overflow-y: auto;
`;

export const ModalCloseButton = styled.button`
  height: 24px;
  width: 24px;
  border-radius: ${BORDER_RADIUS};
  padding: 5px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${COLOR.gray};
  }
  svg {
    width: 14px;
    height: 14px;
  }
`;

export const ApplyCouponButton = styled.button`
  width: 100%;
  height: 44px;
  background-color: ${COLOR.black};
  color: ${COLOR.white};
  font-size: 15px;
  font-weight: 700;
  line-height: 21.72px;
  text-align: center;
  border-radius: ${BORDER_RADIUS};
`;
