import styled from 'styled-components';

type CheckboxProps = {
  isChecked: boolean;
};

export const Checkbox = styled.div<CheckboxProps>`
  font-size: 24px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: ${(props) => (props.isChecked ? '#3288FF' : '#22A6A2')} 1px solid;
  color: ${(props) => (!props.isChecked ? 'transparent' : '#ffffff')};
  background-color: ${(props) => props.isChecked && '#333333'};
`;
