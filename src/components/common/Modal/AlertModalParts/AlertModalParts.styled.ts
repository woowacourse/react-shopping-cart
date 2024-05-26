import { TextAlign } from '@appTypes/index';
import { BORDER_RADIUS, COLOR } from '@styles/style.constant';
import styled from 'styled-components';

export const AlertModalContentsText = styled.p<{ $textAlign: TextAlign }>`
  font-size: 16px;
  text-align: ${({ $textAlign }) => $textAlign};
  margin-top: 12px;
  width: 100%;
`;

export const AlertModalButton = styled.button`
  font-size: 14px;
  border-radius: ${BORDER_RADIUS};
  background-color: ${COLOR.white};
  border: 1px solid ${COLOR.black};
  padding: 10px 14px;
  width: 100px;
  margin-top: 16px;
  &:hover {
    background-color: ${COLOR.black};
    color: ${COLOR.white};
  }
`;
