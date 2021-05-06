import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const UnderlinedText = (props) => {
  const { children } = props;

  return (
    <Styled.Container>
      <Styled.Text>{children}</Styled.Text>
      <Styled.UnderLine />
    </Styled.Container>
  );
};

UnderlinedText.propTypes = {
  children: PropTypes.node,
};
