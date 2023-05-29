import styled from 'styled-components';

export const Root = styled.article`
  display: flex;
  flex-direction: column;
`;

export const Checkbox = styled.input`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;

  margin: 0;

  cursor: pointer;
`;

export const Text = styled.div`
  min-width: 10rem;
  font-size: 1.6rem;
  color: #333333;

  margin: 0 2rem;
`;

export const CartButton = styled.button`
  width: 2.5rem;
  height: 2.2rem;
  border: none;
  background-color: white;
  padding: 0;
`;
