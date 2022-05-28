import styled from 'styled-components';

export default styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.gray};

  .title {
    height: 80px;
    padding-left: 30px;
    border-bottom: 4px solid ${({ theme }) => theme.gray};
  }

  .title h3 {
    line-height: 80px;
    letter-spacing: 0.5px;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.black};
  }

  .amount {
    padding: 34px 30px 35px;
  }

  .amount div {
    margin-bottom: 68px;
  }

  .amount div p {
    position: relative;
    font-size: 2rem;
    letter-spacing: 0.5px;
    color: ${({ theme }) => theme.black};
  }

  .amount div p::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.green};
    opacity: 0.5;
    z-index: -1;
  }
`;
