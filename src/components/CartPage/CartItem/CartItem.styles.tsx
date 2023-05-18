import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  height: 18rem;
  border-bottom: 1px solid darkgray;
  padding-bottom: 2rem;
`;

export const CheckBox = styled.input`
  width: 1rem;
  height: 1rem;
`;

export const Thumbnail = styled.img`
  width: 15rem;
`;

export const Name = styled.h2`
  font-size: 1.5rem;
`;

export const DeleteButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  background-color: transparent;

  cursor: pointer;
`;

export const Price = styled.div`
  font-size: 1.3rem;
`;
