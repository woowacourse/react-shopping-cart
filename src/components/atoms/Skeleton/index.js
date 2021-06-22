import PropTypes from 'prop-types';
import * as S from './style.js';

export const SkeletonLine = (props) => {
  return <S.SkeletonLine {...props}></S.SkeletonLine>;
};

SkeletonLine.propTypes = {
  style: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export const SkeletonRound = (props) => {
  return <S.SkeletonRound {...props}></S.SkeletonRound>;
};

SkeletonRound.propTypes = {
  style: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export const SkeletonResponsiveBox = (props) => {
  return <S.SkeletonResponsiveBox {...props}></S.SkeletonResponsiveBox>;
};

SkeletonResponsiveBox.propTypes = {
  style: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
