import React from 'react';

import CheckBoxStyled from './style';

const CheckBox = ({ id, checked, onChange }) => {
  return (
    <>
      <CheckBoxStyled id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id} />
    </>
  );
};

export default CheckBox;
