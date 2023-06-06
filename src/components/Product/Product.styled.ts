import { styled } from 'styled-components';

export const Container = styled.li`
  position: relative;
`;

export const ProductImage = styled.div<{ path: string }>`
  width: 100%;
  min-width: 130px;

  padding-bottom: 100%;

  background-image: ${(props) => `url(${props.path})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  border-radius: 4px;
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 13px;

  padding: 10px 0;
  letter-spacing: 0.5px;
`;

export const ProductName = styled.p`
  margin-bottom: 6px;
`;

export const ProductPrice = styled.p`
  font-size: 15px;
`;

export const StepperWrapper = styled.div`
  position: absolute;
  right: 12px;
  bottom: 65px;
`;

export const CartIconWrapper = styled.button`
  position: absolute;
  right: 12px;
  bottom: 65px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--grey-100);

  width: 40px;
  height: 40px;

  box-shadow: 0px 0px 4px -2px rgba(0, 0, 0, 0.75);

  border: none;
  border-radius: 50%;
  cursor: pointer;
`;
