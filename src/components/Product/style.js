import styled from 'styled-components';

export default styled.div`
  width: 260px;

  .thumbnail {
    cursor: pointer;
    width: 100%;
    height: 260px;
    margin-bottom: 18px;
    transition: transform 0.2s;
  }

  .thumbnail:hover {
    transform: scale(1.2);
  }

  .title {
    font-size: 1.6rem;
  }

  .title:hover {
    text-decoration: underline;
  }

  .price {
    font-size: 2rem;
  }

  .product-rest-info {
    width: calc(100% - 50px);
  }
`;
