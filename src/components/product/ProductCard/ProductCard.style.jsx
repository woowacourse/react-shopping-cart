import styled from 'styled-components';
import { color } from '../../../styles/Theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  cursor: pointer;

  &:hover {
    h1 {
      text-decoration: underline;
    }

    img {
      transform: scale(1.07);
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Name = styled.h1`
  font-size: 1rem;
`;

export const Price = styled.p``;

export const TransparentButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const Placeholder = styled.div`
  width: 100%;
  aspect-ratio: ${({ shape }) => (shape === 'square' ? '1 / 1' : '10 / 1')};
  background-image: ${({ theme: { colorConfig } }) =>
    `linear-gradient(90deg, ${colorConfig.skeleton} 0px, ${color.NEAR_WHITE_02} 30px, ${colorConfig.skeleton} 60px)`};
  animation: refresh 2s infinite ease-out;

  @keyframes refresh {
    0% {
      background-position: calc(-100px);
    }
    40%,
    100% {
      background-position: 320px;
    }
  }
`;
