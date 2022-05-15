import styled from 'styled-components';

const SIZE_MAP = {
  large: 430,
  middle: 250,
  small: 100,
};

const StyledImageBox = styled.div`
  width: ${(props) =>
    `${
      props.width === 'large'
        ? SIZE_MAP.large
        : props.width === 'middle'
        ? SIZE_MAP.middle
        : SIZE_MAP.small
    }`}px;
  height: ${(props) =>
    `${
      props.height === 'large'
        ? SIZE_MAP.large
        : props.height === 'middle'
        ? SIZE_MAP.middle
        : SIZE_MAP.small
    }`}px;
`;

const StyledImg = styled.img`
  width: ${(props) =>
    `${
      props.width === 'large'
        ? SIZE_MAP.large
        : props.width === 'middle'
        ? SIZE_MAP.middle
        : SIZE_MAP.small
    }`}px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

export { StyledImageBox, StyledImg };
