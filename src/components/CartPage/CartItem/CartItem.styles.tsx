import styled from 'styled-components';
import Flex from '../../common/Flex';

export const Root = styled.li`
  display: flex;
  flex-direction: column;

  flex-grow: 1;
  height: 20rem;
`;

export const Checkbox = styled.input`
  width: 2rem;
  height: 2rem;

  flex-shrink: 0;

  margin: 0;

  cursor: pointer;
`;

export const Thumbnail = styled.img`
  aspect-ratio: 1/1;
  height: 100%;

  margin: 0 2rem;

  @media (max-width: 1024px) {
    height: 10rem;
  }
`;

export const Info = styled(Flex)`
  height: 100%;
  justify-content: space-between;

  padding: 0 2rem;

  @media (max-width: 576px) {
    width: 100%;
    height: 3rem;

    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Name = styled.div`
  flex-grow: 1;

  font-size: 2rem;
  color: #33333;

  word-wrap: break-word;
  word-break: keep-all;

  @media (max-width: 1024px) {
    width: 20%;
  }
`;

export const DeleteButton = styled.button`
  background: white;
  border: none;
  font-size: 2rem;
  color: #33333;

  cursor: pointer;

  @media (max-width: 576px) {
    height: 100%;
    line-height: 3rem;
  }
`;

export const Price = styled.div`
  font-size: 2rem;
  color: #33333;

  @media (max-width: 576px) {
    height: 100%;
    line-height: 3rem;
  }
`;

export const CartButton = styled.button`
  width: 2.5rem;
  height: 2.2rem;
  border: none;
  background-color: white;
  padding: 0;

  cursor: pointer;
`;

export const CartImg = styled.img`
  width: 100%;
`;

export const ProductContainer = styled(Flex)`
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }
`;
