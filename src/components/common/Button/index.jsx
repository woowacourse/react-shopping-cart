import React from 'react';
import PropTypes from 'prop-types';
import {StyledButton, buttonTypes} from 'components/common/Button/style';

export default function Button({children, type = 'button', buttonType, onClick, ...rest}) {
  return (
    <StyledButton type={type} onClick={onClick} buttonType={buttonType} button {...rest}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  buttonType: PropTypes.oneOf(Object.keys(buttonTypes)),
  onClick: PropTypes.func,
};
