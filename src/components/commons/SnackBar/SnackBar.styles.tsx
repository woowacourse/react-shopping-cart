import styled from 'styled-components';

export const SnackBar = styled.div`
  min-width: 250px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 8px 8px 0px 0px;
  padding: 25px 32px;
  position: fixed;
  z-index: 3;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  transition-property: opacity;
  transition-duration: 3s;
  font-size: 20px;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.7s;
  animation: fadein 0.5s, fadeout 0.5s 2.7s;
  @-webkit-keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 30px;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 0;
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      bottom: 0;
      opacity: 1;
    }
    to {
      bottom: -30px;
      opacity: 0;
    }
  }

  @keyframes fadeout {
    from {
      bottom: 0;
      opacity: 1;
    }
    to {
      bottom: -30px;
      opacity: 0;
    }
  }
`;
