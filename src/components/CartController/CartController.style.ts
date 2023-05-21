import styled from 'styled-components';

export const ControllerWrapper = styled.div`
  display: flex;
  align-items: start;
  width: 100%;
`;

export const CartBox = styled.div`
  display: flex;
`;

export const QuantityInput = styled.input`
  height: 28px;
  width: 40px;
  padding: 0px 5px;
  border-top: 1px solid ${({theme}) => theme.color.secondary};
  border-bottom: 1px solid ${({theme}) => theme.color.secondary};
  text-align: center;
`;

export const QuantityControlButton = styled.button`
  height: 28px;
  width: 30px;
  padding: 0px;
  border: 1px solid ${({theme}) => theme.color.secondary};
  line-height: 0px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddCartButton = styled.button`
  padding: 10px 0px 10px 0px;
  background-color: black;
  color: white;
  width: 100%;

  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 21px;
`;
