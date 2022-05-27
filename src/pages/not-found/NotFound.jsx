import NotFoundImg from "@/assets/images/404.png";
import StyledNotFoundMessage from "./NotFoundMessage.styled";
import StyledNotFoundContainer from "./NotFoundContainer.styled";

function NotFound() {
  return (
    <StyledNotFoundContainer>
      <img src={NotFoundImg} alt="존재하지 않는 페이지" />
      <StyledNotFoundMessage>존재하지 않는 페이지입니다.</StyledNotFoundMessage>
    </StyledNotFoundContainer>
  );
}

export default NotFound;
