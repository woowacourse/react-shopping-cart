import { useNavigate } from "react-router-dom";
import { css } from "@emotion/css";
import { CartLayout, Content, Footer, Header } from "../components/layout";
import { Button, Title } from "../components/default";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handelMainClick = () => {
    navigate("/");
  };

  const handelPrevClick = () => {
    navigate(-1);
  };

  return (
    <CartLayout>
      <Header></Header>

      <Content>
        <Title
          title="404 ERROR"
          description="페이지 주소나 네트워크를 다시 확인해주세요."
        />
        <div className={buttonContainerCSS}>
          <Button
            size="medium"
            onClick={handelMainClick}
          >
            메인으로
          </Button>
          <Button
            size="medium"
            onClick={handelPrevClick}
          >
            이전 페이지
          </Button>
        </div>
      </Content>

      <Footer
        text=""
        isActive={true}
      />
    </CartLayout>
  );
};

export default ErrorPage;

const buttonContainerCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
