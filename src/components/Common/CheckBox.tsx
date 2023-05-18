import { styled } from 'styled-components';

interface CheckBoxProps {
  id: string;
}

const CheckBox = ({ id }: CheckBoxProps) => {
  return (
    <div>
      <StyledCheckBox type='checkbox' id={id} />
      <label htmlFor={id}></label>
    </div>
  );
};

const StyledCheckBox = styled.input`
  display: none;

  + label {
    position: relative;
    display: inline-block;
    width: 28px;
    height: 28px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 2px;
  }

  &:checked + label {
    background: ${({ theme }) => theme.colors.black};
  }

  &:checked + label::after {
    content: '';
    position: absolute;
    top: 40%;
    left: 50%;
    width: 8px;
    height: 16px;
    border: solid ${({ theme }) => theme.colors.white};
    border-width: 0 3px 3px 0;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

export default CheckBox;
