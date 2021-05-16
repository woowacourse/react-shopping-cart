import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const SVG = styled.svg`
  transform: scale(${props => props.scale});
`;

const CloseIcon = ({ scale }) => (
  <SVG viewBox="0 0 40 40" scale={scale}>
    <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
  </SVG>
);

CloseIcon.propTypes = {
  scale: PropTypes.string,
};

CloseIcon.defaultProps = { scale: '1.0' };

export default CloseIcon;
