import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const Checkbox = (props) => {
  const { label, ...rest } = props;

  return (
    <Styled.Container {...rest}>
      {label}
      <Styled.Checkbox />
      <Styled.CheckMark />
    </Styled.Container>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
};
