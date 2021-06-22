import PropTypes from 'prop-types';
import * as S from './style.js';

export const TextUnderlined = (props) => {
  const { children, ...rest } = props;

  return (
    <S.Container {...rest}>
      <S.Text>{children}</S.Text>
      <S.UnderLine />
    </S.Container>
  );
};

TextUnderlined.propTypes = {
  children: PropTypes.node.isRequired,
};
