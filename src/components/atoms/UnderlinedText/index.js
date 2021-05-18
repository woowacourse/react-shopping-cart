import PropTypes from 'prop-types';
import * as S from './style.js';

export const UnderlinedText = (props) => {
  const { children, ...rest } = props;

  return (
    <S.Container {...rest}>
      <S.Text>{children}</S.Text>
      <S.UnderLine />
    </S.Container>
  );
};

UnderlinedText.propTypes = {
  children: PropTypes.node.isRequired,
};
