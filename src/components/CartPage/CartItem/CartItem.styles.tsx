import styled from 'styled-components';
import Flex from '../../common/Flex';

export const Root = styled.li`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 20rem;
`;

export const Checkbox = styled.input`
  width: 2rem;
  flex-shrink: 0;

  margin: 0;
`;

export const Thumbnail = styled.img`
  aspect-ratio: 1/1;
  height: 100%;

  margin: 0 2rem;
`;

export const Info = styled(Flex)`
  height: 100%;
  justify-content: space-between;

  padding: 2rem;
`;

export const Name = styled.div`
  flex-grow: 1;

  font-size: 1.6rem;
  color: #33333;
`;

export const DeleteButton = styled.button`
  background: white;
  border: none;
  font-size: 2rem;
  color: #33333;
`;

export const Price = styled.div`
  font-size: 2rem;
  color: #33333;
`;

export const CartButton = styled.button`
  width: 2.5rem;
  height: 2.2rem;
  border: none;
  background-color: white;
  padding: 0;
`;

export const CartImg = styled.img`
  width: 100%;
`;
