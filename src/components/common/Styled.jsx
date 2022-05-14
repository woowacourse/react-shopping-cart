import styled from 'styled-components';

const StyledImageBox = styled.div`
  width: ${(props) => `${props.width === 'large' ? 430 : props.width === 'middle' ? 250 : 100}`}px;
  height: ${(props) =>
    `${props.height === 'large' ? 430 : props.height === 'middle' ? 250 : 100}`}px;
`;

const StyledImg = styled.img`
  width: ${(props) => `${props.width === 'large' ? 430 : props.width === 'middle' ? 250 : 100}`}px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

export { StyledImageBox, StyledImg };
