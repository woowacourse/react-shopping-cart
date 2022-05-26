import styled from "@emotion/styled";

const StyledLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  margin: 0 auto;

  img {
    animation: loadingspin 1.5s linear infinite;
  }

  @keyframes loadingspin {
    100% {
      transform: rotate(-360deg);
    }
  }
`;

export default StyledLoading;
