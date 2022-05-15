import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 20px 15px;

  display: flex;
  justify-content: space-around;
  gap: 20px;

  border-bottom: 1px solid #aaaaaa;
`;

export const Image = styled.img``;

export const Description = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

export const Name = styled.h1`
  font-size: 20px;
  align-self: flex-start;
`;

export const Price = styled.p``;
