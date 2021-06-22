import { PropTypes } from 'prop-types';
import { Line } from '../..';
import * as S from './style.js';
import { COLOR } from '../../../constants';

export const Header = (props) => {
  const { children, ...rest } = props;

  return (
    <S.Container {...rest}>
      <S.Title>{children}</S.Title>
      <Line color={COLOR.HEX.GRAY_800} />
    </S.Container>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
