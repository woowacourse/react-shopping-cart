import PropTypes from 'prop-types';

import { COLORS } from 'styles/theme';

import * as S from './styles';

function TextUnderline({ color, children }) {
  return <S.TextUnderline text={children} color={color} />;
}

TextUnderline.defaultProps = {
  color: COLORS.MINT_900,
};

TextUnderline.propTypes = {
  color: PropTypes.string,
};

export default TextUnderline;
