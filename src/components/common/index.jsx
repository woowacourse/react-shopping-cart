import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 8px;
  min-width: ${({ width, theme }) =>
    `${theme.IMAGE_SIZE_MAP[width] || theme.IMAGE_SIZE_MAP.middle}`}px;
  height: ${({ height, theme }) =>
    `${theme.IMAGE_SIZE_MAP[height] || theme.IMAGE_SIZE_MAP.middle}`}px;
`;

const StyledImg = styled.img`
  width: ${({ width, theme }) => `${theme.IMAGE_SIZE_MAP[width] || theme.IMAGE_SIZE_MAP.middle}`}px;
  height: auto;
  border-radius: 8px;
  &:hover {
    transform: scale(1.2);
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.COLORS.WHITE};
  &:link {
    text-decoration: none;
  }
  &:visited {
    text-decoration: none;
  }
  &:hover {
    text-decoration: underline;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
`;

const FlexCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BASE_COMPONENT = {
  flexWrapper: FlexWrapper,
  flexCenterWrapper: FlexCenterWrapper,
};

export { StyledImageWrapper, StyledImg, StyledLink, BASE_COMPONENT };
