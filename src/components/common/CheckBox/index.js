import React from 'react';
import PropTypes from 'prop-types';
import { HiddenCheckBox, StyledCheckBox } from './index.styles';
import { Check } from '../../../assets/svg';

const CheckBox = ({ checked, onClick }) => (
  <div onClick={onClick}>
    <HiddenCheckBox />
    <StyledCheckBox checked={checked}>
      <Check />
    </StyledCheckBox>
  </div>
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CheckBox;
