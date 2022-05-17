import styled from 'styled-components';

const LoaderLayout = styled.div`
  position: fixed;

  left: calc(50% - 60px);
  top: calc(50% - 60px);

  border: ${({theme}) => `16px solid ${theme.GRAY_500}`};
  border-top: ${({theme}) => `16px solid ${theme.MINT}`};
  border-radius: 50%;
  width: 120px;
  height: 120px;

  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export {LoaderLayout};
