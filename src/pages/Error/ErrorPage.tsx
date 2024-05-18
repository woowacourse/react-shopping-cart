import Button from "@/components/_common/Button/Button";
import Title from "@/components/_common/Title/Title";
import styled from "styled-components";
import { FlexCenter } from "@/styles/common";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/constants/url";

const ErrorFallback = ({ error }: { error: Error }) => {
  const navigate = useNavigate();

  const onMoveCartPage = () => navigate(PAGE_URL.home);

  return (
    <Wrapper>
      <ErrorMessageBox> {error.message}</ErrorMessageBox>
      <ErrorMessageBox>홈페이지로 돌아가시겠습니까?</ErrorMessageBox>
      <Button
        width="fit"
        theme="dark"
        radiusVariant="rounded"
        size="large"
        onClick={onMoveCartPage}
      >
        <Title text="home" />
      </Button>
    </Wrapper>
  );
};

export default ErrorFallback;

const Wrapper = styled.div`
  ${FlexCenter}
  height:100%;
  flex-direction: column;
  gap: 40px;
  text-align: center;
`;

const ErrorMessageBox = styled.div`
  width: 300px;
`;
