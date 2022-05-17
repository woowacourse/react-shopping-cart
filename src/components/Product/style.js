import styled from 'styled-components';

export default styled.div`
  width: 260px;

  .thumbnail {
    width: 100%;
    height: 260px;
    border-radius: 5px;
    margin-bottom: 18px;
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
