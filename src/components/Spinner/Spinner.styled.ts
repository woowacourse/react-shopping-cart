import styled from 'styled-components';

export const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme: { colors } }) => colors.gray};
    color: transparent;

    animation: spin 1s linear infinite;

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
