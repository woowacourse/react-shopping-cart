import styled from 'styled-components';

export const StyledModalBackdrop = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const StyledModal = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: fixed;
  height: fit-content;
  min-height: 10%;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 24px 32px 24px 32px;
  border-radius: 8px;
  background-color: white;
  box-sizing: border-box;
  border: none;
`;

export const StyledMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledModalButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  border-radius: 0;
  &:focus {
    outline: none;
  }
  color: #ffffff;
  background-color: #333333;
  font-size: '15px';
  border: 1px solid #33333340;
  border-radius: 8px;
`;
