import styled from 'styled-components';

export const ControllerWrapper = styled.div`
  display: flex;
  align-items: start;
`;

export const CartBox = styled.div`
  display: flex;
`;

export const QuantityInput = styled.input`
  height: 28px;
  width: 40px;
  padding: 0px 5px;
  border-top: 1px solid ${({ theme }) => theme.secondaryColor};
  border-bottom: 1px solid ${({ theme }) => theme.secondaryColor};
  text-align: center;
`;

export const QuantityControlButton = styled.button`
  height: 28px;
  width: 30px;
  padding: 0px;
  border: 1px solid ${({ theme }) => theme.secondaryColor};
  line-height: 0px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;
