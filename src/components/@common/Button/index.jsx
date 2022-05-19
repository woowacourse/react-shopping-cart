import PropTypes from 'prop-types';

import * as S from './styles';

function Button({ className, type, icon, onClick, children }) {
  const containerType = children ? 'BUTTON' : 'ICON';

  return (
    <S.Container
      className={className}
      type={type}
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
  icon: '',
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,

  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
