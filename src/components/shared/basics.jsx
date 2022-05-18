import styled, { css } from 'styled-components';

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

export const Flex = styled.div`
  ${({
    direction = 'row',
    wrap = 'nowrap',
    justify = 'normal',
    align = 'normal',
    gap = '0',
  }) => css`
    display: flex;
    flex-direction: ${direction};
    flex-wrap: ${wrap};
    justify-content: ${justify};
    align-items: ${align};
    gap: ${gap};
  `}
`;

const DIVIDE_LINE_WEIGHT = {
  bold: 2,
  thin: 1,
};

export const BasicDivideLine = styled.hr`
  ${({ weight = 'bold', mv = 0, color = 'black' }) => css`
    border: ${DIVIDE_LINE_WEIGHT[weight]}px solid ${color};
    margin: ${mv}px 0;
  `}
  width: 100%;
`;
