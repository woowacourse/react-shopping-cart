import React from 'react';
import PropTypes from 'prop-types';

import {InputWrapper} from 'component/common/Input/style';

export default function Input({type, ...rest}) {
  return <InputWrapper type={type} {...rest} />;
}

Input.propTypes = {
  type: PropTypes.string,
};
