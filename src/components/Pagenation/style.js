import styled from 'styled-components';

export default styled.div`
  display: flex;

  .page-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 38px;
    border: 1px solid ${({ theme }) => theme.gray2};
    background-color: white;

    &:hover {
      background-color: ${({ theme }) => theme.gray};

      p {
        color: ${({ theme }) => theme.green2};
      }
    }

    &.__disabled {
      cursor: default;
      background-color: ${({ theme }) => theme.gray};
    }
  }

  .page-item p {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.green};
  }
`;
