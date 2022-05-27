import StyledLoading from "@/components/loading/Loading.styled";
import BaedaliImg from "@/assets/images/baedali.png";

function Loading() {
  return (
    <StyledLoading>
      <img src={BaedaliImg} alt="페이지 로딩 이미지" />
    </StyledLoading>
  );
}

export default Loading;
