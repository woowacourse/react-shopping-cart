import * as S from './Selector.styles';
import PropTypes from 'prop-types';

function Selector({ onChange, checked, label }) {
  return (
    <S.Selector>
      <S.Checkbox type="checkbox" id="checkbox" onChange={onChange} checked={checked} />
      {label && <S.Label htmlFor="checkbox">{label}</S.Label>}
    </S.Selector>
  );
}

Selector.defaultProps = {
  onChange: () => {},
  checked: false,
  label: '',
};

Selector.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  label: PropTypes.string,
};

export default Selector;
