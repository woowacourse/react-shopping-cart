import React from 'react';
import PropTypes from 'prop-types';
import {ButtonWrapper} from 'component/common/Button/style';

export default function Button({children, type = 'button', onClick, ...rest}) {
  return (
    <ButtonWrapper type={type} onClick={onClick} {...rest}>
      {children}
    </ButtonWrapper>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  onClick: PropTypes.func,
};
