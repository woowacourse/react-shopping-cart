import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Text = styled.p`
  color: #0a0d13;
  font-size: 14px;
  font-weight: 500;
`;

export const AllCheckBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 36px;
`;

export const OrderConfirmButton = styled.button`
  width: 500px;
  height: 64px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000000;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;
