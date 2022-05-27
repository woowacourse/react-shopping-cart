import styled from 'styled-components';
import PropType from 'prop-types';
import { useEffect, useState } from 'react';

function CheckBox({ checked, onChange }) {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleCheckBox = () => {
    setIsChecked((prevState) => !prevState);
    onChange(isChecked);
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <Styled.CheckBox
      type="checkbox"
      id="checkbox"
      checked={isChecked}
      onChange={toggleCheckBox}
    />
  );
}

export default CheckBox;

CheckBox.propTypes = {
  checked: PropType.bool,
  onChange: PropType.func.isRequired,
};

CheckBox.defaultProps = {
  checked: false,
};

const Styled = {
  CheckBox: styled.input`
    appearance: none;
    border: 1px solid #22a6a2;
    border-radius: 2px;
    width: 1.75rem;
    height: 1.75rem;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:checked {
      background-color: #22a6a2;
    }

    &:after {
      content: '✔';
      width: 100%;
      height: 100%;
      font-size: 0.75rem;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &:hover {
      opacity: 0.7;
    }
  `,
};
