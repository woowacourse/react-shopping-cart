import PropTypes from 'prop-types';
import * as S from './style.js';

export const List = (props) => {
  const { children, ...rest } = props;
  return <S.List {...rest}>{children}</S.List>;
};

List.propTypes = {
  children: PropTypes.node.isRequired,
};
