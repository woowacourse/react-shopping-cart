import PropTypes from 'prop-types';

import * as S from './styles';

function Checkbox({ size, checked, onChange, children }) {
  return (
    <S.Container size={size} checked={checked}>
      <S.Check type="checkbox" checked={checked} onChange={onChange} />
      {children && <S.Text>{children}</S.Text>}
    </S.Container>
  );
}

Checkbox.defaultProps = {
  checked: false,
  size: 'medium',
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'medium', 'small']), PropTypes.number]),
};

export default Checkbox;
