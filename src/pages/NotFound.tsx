import { styled } from "styled-components";
import { Button, Header, Page } from "../components";
import { useNavigate } from "react-router";
import { ROUTER_PATH } from "../router";

const NotFound = () => {
  const navigate = useNavigate();

  const handleHomeButtonClicked = () => {
    navigate(ROUTER_PATH.Main);
  };

  return (
    <>
      <Header />
      <Page>
        <ErrorBox>
          <h2>Sorry</h2>
          <p>요청하신 페이지를 찾을 수 없어요 🥲</p>
          <Button onClick={handleHomeButtonClicked}>홈으로</Button>
        </ErrorBox>
      </Page>
    </>
  );
};

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 30%;
  height: 100%;
  padding: 200px 0;

  align-items: center;
  text-align: center;
  line-height: 24px;

  & > h2 {
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

export default NotFound;
