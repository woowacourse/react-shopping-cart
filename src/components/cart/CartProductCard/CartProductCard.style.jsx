import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px 15px;

  display: flex;
  justify-content: space-around;
  gap: 20px;

  border-bottom: 1px solid ${({ theme }) => theme.colorConfig.secondary};
`;

export const Description = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Name = styled.h1`
  font-size: 20px;
  align-self: flex-start;
`;

export const Price = styled.p``;
