import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const Checkbox = (props) => {
  const { label } = props;

  return (
    <Styled.Container>
      {label}
      <Styled.Checkbox />
      <Styled.CheckMark />
    </Styled.Container>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
};
