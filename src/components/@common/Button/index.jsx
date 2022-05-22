import PropTypes from 'prop-types';

import * as S from './styles';

function Button({ className, type, state, icon, onClick, children }) {
  const containerType = children ? 'BUTTON' : 'ICON';

  return (
    <S.Container
      className={className}
      type={type}
      state={state}
      icon={icon}
      containerType={containerType}
      onClick={onClick}
    >
      {children}
    </S.Container>
  );
}

Button.defaultProps = {
  className: '',
  type: 'button',
  state: 'default',
  icon: '',
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  state: PropTypes.oneOf(['default', 'primary', 'success', 'complete', 'danger', 'info']),
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
