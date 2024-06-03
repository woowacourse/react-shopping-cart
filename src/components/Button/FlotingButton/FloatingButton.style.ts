import styled from 'styled-components';

export const ButtonContainer = styled.button`
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
    cursor: not-allowed;
    background-color: rgba(190, 190, 190, 1);
    color: rgba(255, 255, 255, 1);
  }
`;
