import styled from 'styled-components';

type CheckboxProps = {
  isChecked: boolean;
  size: string;
};

export const Checkbox = styled.div<CheckboxProps>`
  font-size: 24px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: #22a6a2 1px solid;
  color: ${(props) => (!props.isChecked ? 'transparent' : '#ffffff')};
  background-color: ${(props) => props.isChecked && '#333333'};
  cursor: pointer;
`;

export const Check = styled.div`
  position: relative;
  top: 2px;
`;
