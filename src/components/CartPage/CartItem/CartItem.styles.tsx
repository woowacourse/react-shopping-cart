import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 18rem;
  border-bottom: 1px solid darkgray;
  padding-bottom: 2rem;
  margin-bottom: 3rem;
`;

export const CheckBox = styled.input`
  width: 3rem;
  height: 3rem;
`;

export const Thumbnail = styled.img`
  width: 15rem;
  margin: 0 2rem;
`;

export const Name = styled.h2`
  font-size: 1.5rem;
`;

export const DeleteButton = styled.button`
  width: 4rem;
  height: 4rem;
  border: none;
  background-color: transparent;

  cursor: pointer;
`;

export const DeleteImage = styled.img`
  width: 100%;
`;

export const Price = styled.div`
  font-size: 1.3rem;
`;
