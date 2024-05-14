import styled from 'styled-components';

export const ButtonWrapper = styled.button<{ $isChecked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid ${(props) => (props.$isChecked ? 'black' : 'lightgrey')};
  border-radius: 8px;
  background-color: ${(props) => (props.$isChecked ? 'black' : 'white')};

  img {
    filter: ${(props) => (props.$isChecked ? 'brightness(95%)' : 'brightness(95%)')};
  }
`;
