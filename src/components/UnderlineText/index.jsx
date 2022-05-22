import PropTypes from 'prop-types';
import Styled from './index.style';

const UnderlineText = ({ text }) => {
  return <Styled.UnderlineText>{text}</Styled.UnderlineText>;
};

UnderlineText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default UnderlineText;
