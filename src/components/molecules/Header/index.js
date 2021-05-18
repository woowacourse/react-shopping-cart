import { PropTypes } from 'prop-types';
import { Line } from '../..';
import * as S from './style.js';

export const Header = (props) => {
  const { children, ...rest } = props;

  return (
    <S.Container {...rest}>
      <S.Title>{children}</S.Title>
      <Line color="#333333" />
    </S.Container>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
