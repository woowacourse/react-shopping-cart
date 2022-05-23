import styled from 'styled-components';

export default styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 60px;

  .product-wrapper {
    width: 400px;

    img {
      margin: 0 auto;
      width: 380px;
      height: 380px;
    }
  }

  .title-wrapper {
    margin-top: 21px;
    border-bottom: 1px solid ${({ theme }) => theme.black};
  }

  .title {
    padding-left: 10px;
    padding-bottom: 33px;
    font-size: 3.2rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black};
  }

  .bottom {
    padding: 0 10px;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black};
  }

  .bottom p:fitst-child {
    font-size: 2.4rem;
  }

  .bottom p:last-child {
    font-size: 3.2rem;
  }
`;
