import PropTypes from 'prop-types';
import Styled from './index.style';

const UnderlineText = ({ text }) => {
  return <Styled.UnderlineText>{text}</Styled.UnderlineText>;
};

UnderlineText.propTypes = {
  /**
   * 표시되는 텍스트
   */
  text: PropTypes.string.isRequired,
};

export default UnderlineText;
