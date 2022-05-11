import React from 'react';
import PropTypes from 'prop-types';

import {InputWrapper} from 'component/common/Input/style';

export default function Input({type, onChange, ...rest}) {
  return <InputWrapper type={type} onChange={onChange} {...rest} />;
}

Input.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
};
