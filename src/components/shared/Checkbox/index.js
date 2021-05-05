import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Checkbox = ({ align, children }) => {
  return (
    <Styled.CheckboxContainer align={align}>
      <Styled.Checkbox type={'checkbox'} />
      {children}
    </Styled.CheckboxContainer>
  );
};

Checkbox.propTypes = {
  children: PropTypes.elementType,
  align: PropTypes.oneOf(['flex-start', 'center']),
};

Checkbox.defaultProps = {
  align: 'center',
};

export default Checkbox;
