import Button from "@/components/_common/Button/Button";
import styled from "styled-components";
import { FlexCenter } from "@/styles/common";
import { PAGE_URL } from "@/constants/url";
import { useNavigate } from "react-router-dom";
import TextBox from "@/components/_common/TextBox/TextBox";
import MainLayout from "@/components/layout/MainLayout";

const ErrorPage = ({ error }: { error: Error }) => {
  const navigate = useNavigate();

  const handleReload = () => {
    if (window.location.pathname === PAGE_URL.home) {
      window.location.reload();
    } else {
      navigate(PAGE_URL.home);
    }
  };

  return (
    <MainLayout>
      <MainLayout.Header></MainLayout.Header>
      <MainLayout.Body>
        <Wrapper>
          <ErrorMessageBox> {error.message}</ErrorMessageBox>

          <Button
            width="fit"
            theme="dark"
            radiusVariant="rounded"
            size="large"
            onClick={handleReload}
          >
            <TextBox type="xLarge" text="home" />
          </Button>
        </Wrapper>
      </MainLayout.Body>
    </MainLayout>
  );
};

export default ErrorPage;

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
