import styled from 'styled-components';

export const Dialog = styled.dialog`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);

  width: fit-content;
  height: fit-content;

  background-color: white;
  border: none;
  border-radius: 5px;
`;

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const CartButton = styled.button`
  width: 2.5rem;
  height: 2.2rem;
  border: none;
  background-color: white;
  padding: 0;

  cursor: pointer;
`;

export const Box = styled.div`
  display: flex;

  height: 50rem;
  width: 40rem;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Thumbnail = styled.img`
  width: 80%;
`;

export const Name = styled.div`
  font-size: 2rem;
`;

export const Price = styled.div`
  font-size: 3rem;
`;
