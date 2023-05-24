import styled from "styled-components";
import { CheckIcon } from "../../assets/ShoppingCartIcons";

interface CheckboxProps {
  onChange: () => void;
  checked: boolean;
}

export const Checkbox = ({ onChange, checked }: CheckboxProps) => {
  return (
    <Style.Button onClick={onChange}>
      {checked && (
        <Style.Icon>
          <CheckIcon />
        </Style.Icon>
      )}
    </Style.Button>
  );
};

const Style = {
  Icon: styled.div`
    width: 28px;
    height: 28px;

    background-color: rgb(4, 192, 158);
  `,

  CheckBox: styled.input`
    width: 28px;
    height: 28px;

    cursor: pointer;
    appearance: auto;
    background-repeat: no-repeat;
  `,

  Button: styled.button`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;
    border-radius: 2px;
  `,
};
