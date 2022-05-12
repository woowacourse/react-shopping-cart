import styled, { css } from 'styled-components';

const StyledProductItem = styled.div`
  width: 282px;
  position: relative;
`;

const StyledProductContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  padding: 0 15px;
`;

const StyledProductText = styled.p`
  font-weight: 400;
  letter-spacing: 0.5px;
  color: var(--product-text-color);

  ${({ name }) =>
    name &&
    css`
      font-size: 16px;
      line-height: 22px;
    `}

  ${({ price }) =>
    price &&
    css`
      font-size: 20px;
      line-height: 27px;
    `}
`;

export { StyledProductItem, StyledProductContainer, StyledProductText };
