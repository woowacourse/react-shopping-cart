import styled from "styled-components";

export const ControllerWrapper = styled.div`
  display: flex;
`;

export const CartBox = styled.div`
  display: flex;
`;

export const QuantityInput = styled.input`
  height: 40px;
  width: 60px;
  padding: 0px 5px;
  border: 1px solid ${({ theme }) => theme.color.secondary};
  text-align: center;
  font-size: 20px;
`;

export const QuantityControlButton = styled.button`
  height: 40px;
  width: 40px;
  padding: 0px;
  border: 1px solid ${({ theme }) => theme.color.secondary};
  line-height: 0px;
  font-size: 20px;
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
