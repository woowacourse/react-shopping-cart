import styled from '@emotion/styled';
import { css } from '@emotion/react';

const Container = styled.div`
  margin-bottom: 2rem;

  .description {
    display: flex;
    justify-content: space-between;
  }

  .info {
    width: 100%;
    padding: 0.6rem 0;

    & > p {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & > .title {
      font-weight: bold;
      font-size: 0.9rem;
      padding: 0.5rem 0;
    }
  }

  .image-wrapper {
    position: relative;
    width: 100%;

    &::after {
      content: '';
      display: block;
      padding-bottom: 100%;
    }

    & > img {
      position: absolute;
      width: 100%;
      height: 100%;

      left: 0px;
      top: 0px;
      object-fit: cover;
    }
  }

  & > .info {
  }
`;

export { Container };
