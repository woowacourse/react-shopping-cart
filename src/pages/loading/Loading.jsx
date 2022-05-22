import BaedaliImg from "@/assets/images/baedali.png";
import StyledLoading from "./Loading.styled";

function Loading() {
  return (
    <StyledLoading>
      <img src={BaedaliImg} alt="페이지 로딩 이미지" />
    </StyledLoading>
  );
}

export default Loading;
