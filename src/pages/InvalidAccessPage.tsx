import { css } from "@emotion/css";
import { useNavigate } from "react-router";
import Header from "../components/@common/Header/Header";
import Text from "../components/@common/Text/Text";
import ConfirmButton from "../components/@common/Button/ConfirmButton/ConfirmButton";

const InvalidAccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className={InvalidAccessPageStyles}>
      <Header
        leading="./back-icon.svg"
        onLeadingClick={() => {
          navigate("/");
        }}
      />
      <section className={ContentStyle}>
        <Text text="잘못된 접근입니다" type="large" />
        <Text text="장바구니에서 다시 주문해 주세요." />
      </section>
      <ConfirmButton text="장바구니로 돌아가기" onClick={() => navigate("/")} />
    </div>
  );
};

export default InvalidAccessPage;

const InvalidAccessPageStyles = css`
  min-height: 100dvh;
  background-color: #ffffff;
`;

const ContentStyle = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 128px);
`;
