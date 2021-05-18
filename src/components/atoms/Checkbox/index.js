import PropTypes from 'prop-types';
import * as S from './style.js';

export const Checkbox = (props) => {
  const { label, isChecked, onChange, ...rest } = props;

  return (
    <S.Container {...rest}>
      {label}
      <S.Checkbox checked={isChecked} onChange={onChange} />
      <S.CheckMark />
    </S.Container>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  isChecked: true,
};
