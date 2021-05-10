import styled from '@emotion/styled';

type SnackbarInnerProps = {
  isShowing: boolean;
};

const Root = styled.div`
  display: table-cell;
  vertical-align: bottom;
  position: fixed;
  left: 50%;
  bottom: 0;
  z-index: 100;
`;

const SnackbarInner = styled.div<SnackbarInnerProps>`
  visibility: ${({ isShowing }) => (isShowing ? 'visible' : 'hidden')};
  min-width: 250px;
  margin-left: -125px;
  background-color: #333333;
  color: #ffffff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;

  -webkit-animation: fadeIn 0.5s, fadeOut 0.5s 1.7s;
  animation: fadeIn 0.5s, fadeOut 0.5s 1.7s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default { Root, SnackbarInner };
