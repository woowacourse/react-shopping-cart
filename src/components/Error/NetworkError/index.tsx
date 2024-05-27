import styled from "styled-components";
import IMAGES from "../../../assets/images/Images";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../../constants/styles";
import { ERROR_MESSAGE } from "../../../constants/messages";

const NetworkError = () => {
  return (
    <NetworkErrorContainer>
      <Title>{ERROR_MESSAGE.failAccess}</Title>
      <video muted autoPlay loop>
        <source src={IMAGES.seaOtter} type="video/mp4" />
      </video>
      <Content>{ERROR_MESSAGE.networkError}</Content>
      <Button onClick={() => window.location.reload()}>{ERROR_MESSAGE.retry}</Button>
    </NetworkErrorContainer>
  );
};

export default NetworkError;

const NetworkErrorContainer = styled.div`
  padding-top: 8%;
  text-align: center;
`;

const Title = styled.h1`
  text-align: center;
  font-size: ${FONT_SIZE.large};
  font-weight: ${FONT_WEIGHT.bold};
  color: black;
  padding-bottom: 20px;
`;

const Content = styled.h2`
  text-align: center;
  color: ${COLOR.black};
  padding: 20px 0 40px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: ${FONT_SIZE.medium};
  font-weight: ${FONT_WEIGHT.bold};
  color: ${COLOR.white};
  background-color: ${COLOR.blue};
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;
