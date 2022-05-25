import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 60px;

  .product-wrapper {
    width: 400px;

    > img {
      margin: 0 auto;
      width: 380px;
      height: 380px;
    }
  }

  .top {
    padding: 0 10px;
    margin-top: 10px;
  }

  .title {
    font-size: 3.2rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black};
  }

  .bottom {
    margin-top: 5px;
    padding: 10px 10px 0;
    letter-spacing: 0.5px;
    border-top: 1px solid ${({ theme }) => theme.black};
    color: ${({ theme }) => theme.black};
  }

  .bottom p:first-child {
    font-size: 2.4rem;
  }

  .bottom p:last-child {
    font-size: 3.2rem;
  }
`;
