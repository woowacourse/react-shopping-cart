import React from 'react';
import PropTypes from 'prop-types';
import {StyledButton, buttonColor} from 'component/common/Button/style';

export default function Button({children, type = 'button', backgroundColor, onClick, ...rest}) {
  return (
    <StyledButton type={type} onClick={onClick} backgroundColor={backgroundColor} button {...rest}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  backgroundColor: PropTypes.oneOf(Object.keys(buttonColor)),
  onClick: PropTypes.func,
};
