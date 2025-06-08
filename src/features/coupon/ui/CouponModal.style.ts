import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CouponModalContainer = styled.div`
  width: 100%;
  border-radius: 10px;
`;

export const CouponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ButtonCSS = css`
  width: 100%;
  height: 44px;
  font-size: 15px;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  transition: background-color 0.1s ease;

  &:hover:enabled {
    background-color: #000;
  }
`;
