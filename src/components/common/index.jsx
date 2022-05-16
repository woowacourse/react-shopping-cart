import styled from 'styled-components';

const StyledImageWrapper = styled.div`
  width: ${({ width, theme }) =>
    `${
      width === 'large'
        ? theme.IMAGE_SIZE_MAP.large
        : width === 'middle'
        ? theme.IMAGE_SIZE_MAP.middle
        : theme.IMAGE_SIZE_MAP.small
    }`}px;
  height: ${({ height, theme }) =>
    `${
      height === 'large'
        ? theme.IMAGE_SIZE_MAP.large
        : height === 'middle'
        ? theme.IMAGE_SIZE_MAP.middle
        : theme.IMAGE_SIZE_MAP.small
    }`}px;
`;

const StyledImg = styled.img`
  width: ${({ width, theme }) =>
    `${
      width === 'large'
        ? theme.IMAGE_SIZE_MAP.large
        : width === 'middle'
        ? theme.IMAGE_SIZE_MAP.middle
        : theme.IMAGE_SIZE_MAP.small
    }`}px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
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

export { StyledImageWrapper, StyledImg, BASE_COMPONENT };
