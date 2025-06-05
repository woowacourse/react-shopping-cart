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
  padding-bottom: 10px;
  box-shadow: 0 2px 4px -2px rgba(0, 0, 0, 0.1);
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

  &:disabled {
    background-color: #bebebe;
  }
`;

export const ScrollContainer = styled.div`
  height: 350px;
  overflow-y: auto;
  margin-bottom: 30px;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;
