import PropTypes from 'prop-types';
import * as Styled from './style';

const Title = ({ contents }) => {
  return (
    <Styled.Wrapper>
      <h2>{contents}</h2>
      <Styled.Line />
    </Styled.Wrapper>
  );
};

Title.propTypes = {
  contents: PropTypes.string,
};

export default Title;
