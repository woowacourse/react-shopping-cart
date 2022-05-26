import React from 'react';
import PropTypes from 'prop-types';
import {StyledButton, buttonTypes, buttonSizeTypes} from 'components/common/Button/style';

export default function Button({
  children,
  type = 'button',
  buttonType,
  buttonSizeType,
  onClick,
  ...rest
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      buttonType={buttonType}
      buttonSizeType={buttonSizeType}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  buttonType: PropTypes.oneOf(Object.keys(buttonTypes)),
  buttonSizeType: PropTypes.oneOf(Object.keys(buttonSizeTypes)),
  onClick: PropTypes.func,
};
