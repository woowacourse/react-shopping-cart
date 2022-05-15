import styled from 'styled-components';
import { SIZE } from '../../constant';

const StyledImageBox = styled.div`
  width: ${(props) =>
    `${props.width === SIZE.LARGE ? 430 : props.width === SIZE.MIDDLE ? 250 : 100}`}px;
  height: ${(props) =>
    `${props.height === SIZE.LARGE ? 430 : props.height === SIZE.MIDDLE ? 250 : 100}`}px;
`;

const StyledImg = styled.img`
  width: ${(props) =>
    `${props.width === SIZE.LARGE ? 430 : props.width === SIZE.MIDDLE ? 250 : 100}`}px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

export { StyledImageBox, StyledImg };
