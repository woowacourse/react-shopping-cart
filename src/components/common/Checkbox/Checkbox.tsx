import { useId } from 'react';
import { styled } from 'styled-components';

const Checkbox = ({ checked = false }: { checked?: boolean }) => {
  const id = useId();

  return (
    <>
      <StyledCheckbox type="checkbox" id={id} checked={checked} />
      <label htmlFor={id}></label>
    </>
  );
};

const StyledCheckbox = styled.input`
  appearance: none;
  width: 28px;
  height: 28px;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  cursor: pointer;
  margin-right: 15px;

  &:checked {
    border: 1px solid #3288ff;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #333;
  }
`;

export default Checkbox;
