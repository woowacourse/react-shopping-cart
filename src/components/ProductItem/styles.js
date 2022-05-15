import styled from '@emotion/styled';

const Container = styled.div`
  margin-bottom: 2rem;

  .image-wrapper {
    cursor: pointer;

    position: relative;
    width: 100%;
    overflow: hidden;
    filter: brightness(0.95);

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
      transition: transform 0.3s ease;
    }

    &:hover > img {
      transform: scale(110%);
    }
  }

  .description {
    display: flex;
    justify-content: space-between;
  }

  .info {
    width: 80%;
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

    & > .price {
      font-size: 1.2rem;
    }
  }

  .button-wrapper {
    display: flex;
    align-items: center;
    justify-content: right;
    width: 20%;
  }
`;

export { Container };
