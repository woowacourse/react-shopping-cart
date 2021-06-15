import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Checkbox = ({ isChecked, onChange, align, children }) => {
  return (
    <Styled.CheckboxContainer align={align}>
      <Styled.Checkbox type="checkbox" checked={isChecked && 'checked'} onChange={onChange} />
      {children}
    </Styled.CheckboxContainer>
  );
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  isChecked: PropTypes.bool,
  align: PropTypes.oneOf(['flex-start', 'center']),
};

Checkbox.defaultProps = {
  align: 'center',
  isChecked: false,
};

export default Checkbox;
