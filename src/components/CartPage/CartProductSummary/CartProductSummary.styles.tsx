import { styled } from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
`;

export const ProductCountWrapper = styled.div`
  padding-bottom: 16px;
  border-bottom: 4px solid #aaaaaa;
`;

export const ProductCount = styled.span`
  font-size: 20px;
  line-height: 33px;
  letter-spacing: 0.5px;
  color: #333333;
`;

export const ProductList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  width: fit-content;
  display: flex;
  align-items: center;
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

export const LabelContent = styled.span`
  margin-left: 15px;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #333333;
  cursor: pointer;
`;

export const ProductsDeleteButton = styled.button`
  border: 1px solid #bbbbbb;
  padding: 8px 18px;
  background-color: #fff;
  cursor: pointer;
`;

export const ProductSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const EmptyProductWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #333333;
`;
