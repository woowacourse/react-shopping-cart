import styled from 'styled-components';

export default styled.div`
  width: 260px;

  .thumbnail {
    cursor: pointer;
    width: 100%;
    height: 260px;
    margin-bottom: 18px;
  }

  .thumbnail:hover {
    transform: scale(1.2);
  }

  .bottom {
    color: ${({ theme }) => theme.black};

    .title {
      font-size: 1.6rem;
    }

    .price {
      font-size: 2rem;
    }

    img {
      width: 30px;
      height: 30px;
    }
  }
`;
