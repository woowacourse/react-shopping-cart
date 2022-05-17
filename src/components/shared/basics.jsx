import styled from 'styled-components';

export const BasicButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

const basicImageSize = {
  small: {
    width: 144,
    height: 144,
  },
  medium: {
    width: 282,
    height: 282,
  },
  large: {
    width: 540,
    height: 540,
  },
};

export const BasicImage = styled.img`
  width: ${({ size }) => basicImageSize[size]?.width ?? 282}px;
  height: ${({ size }) => basicImageSize[size]?.height ?? 282}px;
`;
