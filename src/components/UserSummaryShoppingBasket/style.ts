import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Username = styled.div`
  margin-right: 5px;
  color: #ffffff;
`;

export const Quantity = styled.div`
  background-color: #06c09e;
  color: #ffffff;

  font-weight: 700;
  font-size: 12px;

  width: 24px;
  height: 24px;

  padding-left: 1px;
  padding-top: 1px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlusIcon = styled.span`
  position: relative;
  bottom: 9px;
  right: 1px;

  color: #ffffff;
  font-weight: 700;
`;
