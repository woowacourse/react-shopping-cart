import PropTypes from 'prop-types';
import * as S from './style.js';

export const Template = (props) => {
  const { viewport, children, ...rest } = props;
  return (
    <>
      <S.Container {...rest}>
        <S.Viewport style={viewport}>{children}</S.Viewport>
      </S.Container>
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
