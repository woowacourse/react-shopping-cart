import styled from "@emotion/styled";

function Loading() {
  return (
    <Container>
      <LoadingImg src="./assets/gifs/Loading.gif" alt="로딩 스피너" />
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingImg = styled.img`
  width: 120px;
  height: 60px;

  object-fit: cover;
`;
export default Loading;
