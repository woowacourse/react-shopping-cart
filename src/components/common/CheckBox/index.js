import React from 'react';
import PropTypes from 'prop-types';
import { HiddenCheckBox, StyledCheckBox } from './index.styles';

const CheckBox = ({ checked, onClick }) => (
  <div onClick={onClick}>
    <HiddenCheckBox />
    <StyledCheckBox checked={checked}>
      <svg
        width="15"
        viewBox="1 3 23 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 13L9.11069 20.1107L21.8318 7.38956"
          stroke="white"
          strokeWidth="3"
        />
      </svg>
    </StyledCheckBox>
  </div>
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CheckBox;
