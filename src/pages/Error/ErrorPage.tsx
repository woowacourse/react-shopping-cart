import Button from "@/components/_common/Button/Button";
import Title from "@/components/_common/Title/Title";
import styled from "styled-components";
import { FlexCenter } from "@/styles/common";
import { PAGE_URL } from "@/constants/url";
import { useNavigate } from "react-router-dom";

const ErrorFallback = ({ error }: { error: Error }) => {
  const navigate = useNavigate();

  const handleReload = () => {
    if (window.location.pathname === PAGE_URL.home) {
      window.location.reload();
    } else {
      navigate(PAGE_URL.home);
    }
  };

  return (
    <Wrapper>
      <ErrorMessageBox> {error.message}</ErrorMessageBox>

      <Button
        width="fit"
        theme="dark"
        radiusVariant="rounded"
        size="large"
        onClick={handleReload}
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
