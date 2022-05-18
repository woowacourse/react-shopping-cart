import React, { useEffect, useState } from 'react';
import { CheckBoxStyle, DefaultCheckBox } from './styles';

const CheckBox = ({ children }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    console.log('state changed : ', isChecked);
  }, [isChecked]);

  return (
    <label>
      <CheckBoxStyle isChecked={isChecked}>
        ✔
        <DefaultCheckBox
          type="checkbox"
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
      </CheckBoxStyle>
      {children}
    </label>
  );
};

export default CheckBox;
