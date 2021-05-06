import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const BorderTopList = (props) => {
  const { children } = props;

  return <Styled.List>{children}</Styled.List>;
};

BorderTopList.propTypes = {
  children: PropTypes.node.isRequired,
};
