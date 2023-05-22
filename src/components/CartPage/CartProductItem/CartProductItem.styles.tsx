import { styled } from 'styled-components';

export const ProductItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
  height: 192px;
  & + & {
    border-top: 1.5px solid #cccccc;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding: 4px 0;
`;

export const ProductImageContainer = styled.div`
  position: relative;
  margin: 0 20px 0 15px;
  flex: 0 0 144px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
    background-color: var(--color-image-overlay);
    background-size: 100%;
    z-index: 1;
  }
`;

export const ProductImage = styled.img`
  width: 144px;
  height: 144px;
`;

export const Label = styled.label`
  width: 28px;
  height: 28px;
  align-self: flex-start;
`;

export const Input = styled.input<{ icon: string }>`
  appearance: none;
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  border: 1px solid #22a6a2;
  border-radius: 2px;
  transform: translateY(0%);
  cursor: pointer;

  &:checked {
    background: #333333;
    border: 1px solid #3288ff;
  }

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-image: ${({ icon }) => `url(${icon})`};
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const ProductDeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const ProductInfoUpperBoundary = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ProductName = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333333;
`;

export const ProductPriceInfo = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.5px;

  color: #333333;
`;
