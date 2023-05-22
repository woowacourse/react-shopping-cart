import { useState } from 'react';
import { styled } from 'styled-components';

const CheckBoxContainer = styled.div`
  appearance: none;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  outline: none;

  :focus {
    outline: none;
  }

  @media (max-width: 480px) {
    /* width: auto; */
    /* height: 20px; */
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  appearance: none;

  &:checked::after {
    content: '✔';
    width: 100%;
    height: 110%;
    color: white;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

type CheckBoxProps = {
  kind: 'ALL' | 'ITEM';
  setAll?: (check: boolean) => void;
  onClick?: (check: boolean) => void;
  defaultChecked?: boolean;
};

const CheckBox = (props: CheckBoxProps) => {
  const { kind, setAll, onClick, defaultChecked } = props;

  const [checked, setChecked] = useState(defaultChecked ?? false);

  const handleOnClickCheckBox = () => {
    if (!onClick) return;

    setChecked((prev) => !prev);
    onClick(!checked);
  };

  const handleSetAll = () => {
    if (!setAll) return;

    setAll(checked);
    setChecked((prev) => !prev);
  };

  return (
    <CheckBoxContainer onClick={kind === 'ALL' ? handleSetAll : handleOnClickCheckBox}>
      <label htmlFor="checkbox">
        <Input
          width="100%"
          height="100%"
          name="checkbox"
          type="checkbox"
          readOnly
          checked={defaultChecked}
        />
        {}
      </label>
    </CheckBoxContainer>
  );
};

export default CheckBox;
