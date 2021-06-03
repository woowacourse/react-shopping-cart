import React from 'react';
import PropTypes from 'prop-types';
import { HiddenCheckBox, StyledCheckBox } from './index.styles';
import { Check } from '../../../assets/svg';

const CheckBox = ({ onCheckBoxClick, isChecked }) => (
  <>
    <StyledCheckBox
      onClick={onCheckBoxClick}
      isChecked={isChecked}
      htmlFor="checkbox"
    >
      <Check />
    </StyledCheckBox>
    <HiddenCheckBox type="checkbox" name="checkbox" />
  </>
);

CheckBox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onCheckBoxClick: PropTypes.func.isRequired,
};

export default CheckBox;
