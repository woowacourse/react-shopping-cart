import styled from 'styled-components';

export default styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(/img/404_error_desktop.jpg);

  div {
    position: fixed;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
  }

  div p {
    margin-bottom: 10px;
    font-size: 2.4rem;
    color: ${({ theme }) => theme.black};
  }

  button {
    cursor: pointer;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.green};
    color: white;
  }

  @media screen and (max-width: 700px) {
    background-image: url(/img/404_error_mobile.jpg);

    div {
      top: unset;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  @media screen and (max-width: 500px) {
    div p {
      font-size: 1.8rem;
    }
  }
`;
