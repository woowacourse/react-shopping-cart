import styled from 'styled-components';
import Flex from '../../common/Flex';

export const Root = styled.article`
  display: flex;
  flex-direction: column;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 80%;
`;

export const Info = styled(Flex)`
  justify-content: space-between;
  height: 20%;
  padding-top: 1.8rem;
`;

export const Name = styled.div`
  font-size: 1.6rem;
  color: #33333;
`;

export const Price = styled.div`
  padding: 1.5rem 0;

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
