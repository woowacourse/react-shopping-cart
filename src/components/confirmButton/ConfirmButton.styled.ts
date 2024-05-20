import styled from 'styled-components';

export const StyledConfirmButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 64px;
  top: 872px;
  padding: 24px 65px;
  background-color: ${(props) => (props.disabled ? '#BEBEBE' : '#000000')};
  border: none;
  border-radius: 0px;

  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
  color: #ffffff;

  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
