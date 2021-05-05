/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Styled from './Checkbox.styles';

type CheckboxProps = {
  labelText: string;
};

const Checkbox = (props: CheckboxProps) => {
  const { labelText } = props;

  return (
    <>
      <Styled.Label className="container">
        {labelText}
        <Styled.Checkbox type="checkbox" />
        <Styled.CheckMark className="checkmark" />
      </Styled.Label>
    </>
  );
};

export default Checkbox;
