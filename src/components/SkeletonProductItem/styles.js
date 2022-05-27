import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { GRADIENT } from 'styles/theme';

const refresh = keyframes`
  0% {
    background-position: calc(-100px);
  }
  40%,
  100% {
    background-position: 320px;
  }
`;

const Container = styled.div`
  cursor: wait;
  margin-bottom: 2rem;
  width: 50%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 90%;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 1rem;
  background-image: ${GRADIENT.GRAY};
  animation: ${refresh} 2s ease infinite;

  &::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 0%;

  & > p {
    width: 90%;
    margin: 0 auto;
    font-size: 1.16rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-image: ${GRADIENT.GRAY};
    animation: ${refresh} 2s ease infinite;
  }
`;

const SingleLineText = styled.p`
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  background-image: ${GRADIENT.GRAY};
  animation: ${refresh} 2s ease infinite;
`;

const Button = styled.button`
  cursor: wait;
  width: 90%;
  height: 70px;
  border: none;
  margin: 2rem auto;
  font-size: 1.16rem;
  background-image: ${GRADIENT.GRAY};
  animation: ${refresh} 2s ease infinite;
`;

export { Container, ImageWrapper, Description, Info, SingleLineText, Button };
