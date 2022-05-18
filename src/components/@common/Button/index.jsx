import PropTypes from 'prop-types';

import * as Styled from './styles';

function Button({ className, type, icon, onClick, children }) {
  const containerType = children ? 'BUTTON' : 'ICON';

  return (
    <Styled.Container
      className={className}
      type={type}
      icon={icon}
      containerType={containerType}
      onClick={onClick}
    >
      {children}
    </Styled.Container>
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
