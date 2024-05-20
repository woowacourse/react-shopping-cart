import styled from 'styled-components';

export const ButtonStyle = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #ffffff;
  padding: 5px 9px;
  font-weight: 500;
  font-size: 12px;
  color: rgba(10, 13, 19, 1);
`;

export const CountButtonStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
  width: 24px;
  height: 24px;
  font-size: 20px;
`;

export const FloatingButtonStyle = styled.button`
  background-color: #000000;
  margin: 0 auto;
  width: 100%;
  padding: 24px 0;
  color: #ffffff;
  font-weight: 700;
  line-height: 16px;
  font-size: 16px;
  position: fixed;
  bottom: 0;
  z-index: 1;

  &:disabled {
    background-color: rgba(190, 190, 190, 1);
    color: rgba(255, 255, 255, 1);
  }
`;
