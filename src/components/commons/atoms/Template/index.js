import PropTypes from 'prop-types';
import * as Styled from './style.js';

export const Template = (props) => {
  const { viewport, children, ...rest } = props;
  return (
    <>
      <Styled.Container {...rest}>
        <Styled.Viewport style={viewport}>{children}</Styled.Viewport>
      </Styled.Container>
    </>
  );
};

Template.propTypes = {
  viewport: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  children: PropTypes.node.isRequired,
};
