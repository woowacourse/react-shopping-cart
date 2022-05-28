import { css } from '@emotion/react';
import styled from '@emotion/styled';

import animate from 'styles/utils/animate';

import EmptyCharacter from 'assets/image/empty.png';
import ErrorCharacter from 'assets/image/error.png';
import LoadingCharacter from 'assets/image/loading.png';

const CONTAINER_BEFORE = {
  LOADING: css`
    background-image: url(${LoadingCharacter});

    width: 6.25rem;
    height: 6.25rem;
    ${animate(
      '0.3s linear Infinite Alternate',
      css`
        from {
          transform: translateY(-7%);
        }

        to {
          transform: translateY(0%);
        }
      `,
    )}
  `,

  EMPTY: css`
    background-image: url(${EmptyCharacter});

    width: 10rem;
    height: 10rem;
  `,

  ERROR: css`
    background-image: url(${ErrorCharacter});

    width: 10rem;
    height: 10rem;
  `,
};

const Container = styled.div`
  display: block;
  text-align: center;

  width: 100%;
  padding: 5rem;

  &::before {
    content: '';

    display: block;
    margin: 0 auto 2rem;

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    ${({ status }) => CONTAINER_BEFORE[status.toUpperCase()]}
  }
`;

const Title = styled.p`
  font-family: 'Kirang Haerang', '맑은 고딕', sans-serif;
  font-size: 1.5rem;
  color: #000;
  letter-spacing: 3px;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const ErrorText = styled.p`
  font-size: 0.9rem;
  letter-spacing: 3px;
  color: #aaa;
`;

export { Container, Title, ErrorText };
