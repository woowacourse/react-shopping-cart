import React from 'react';
import PropTypes from 'prop-types';
import { HiddenCheckBox, StyledCheckBox } from './index.styles';
import { Check } from '../../../assets/svg';

const CheckBox = ({ isChecked, onCheckBoxClick }) => (
  <div>
    <StyledCheckBox onClick={onCheckBoxClick} isChecked={isChecked}>
      <Check />
    </StyledCheckBox>
    <HiddenCheckBox />
  </div>
);

CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onCheckBoxClick: PropTypes.func.isRequired,
};

export default CheckBox;
