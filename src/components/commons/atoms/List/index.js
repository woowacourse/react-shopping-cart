import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const List = (props) => {
  const { children, ...rest } = props;
  return <Styled.List {...rest}>{children}</Styled.List>;
};

List.propTypes = {
  children: PropTypes.node.isRequired,
};
