import styled from 'styled-components';

type ErrorImgProps = {
  width?: string;
  height?: string;
};

export const ErrorImg = styled.img<ErrorImgProps>`
  width: ${(props) => props.width ?? '200px'};
  height: ${(props) => props.height ?? '200px'};
`;
