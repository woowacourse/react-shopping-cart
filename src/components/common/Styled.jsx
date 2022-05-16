import styled from 'styled-components';

const SIZE_MAP = {
  large: 430,
  middle: 250,
  small: 100,
};

const StyledImageBox = styled.div`
  width: ${(props) => `${SIZE_MAP[props.width]}`}px;
  height: ${(props) => `${SIZE_MAP[props.height]}`}px;
`;

const StyledImg = styled.img`
  width: ${(props) => `${SIZE_MAP[props.width]}`}px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

export { StyledImageBox, StyledImg };
