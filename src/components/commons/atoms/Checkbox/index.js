import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const Checkbox = (props) => {
  const { label, isChecked, onChange, ...rest } = props;

  return (
    <Styled.Container {...rest}>
      {label}
      <Styled.Checkbox checked={isChecked} onChange={onChange} />
      <Styled.CheckMark />
    </Styled.Container>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
};
