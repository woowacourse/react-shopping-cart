import { styled } from "styled-components";
import { useNavigate } from "react-router";
import { ROUTER_PATH } from "router";
import Header from "components/Header";
import Page from "components/common/Page";

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
          <HomeButton onClick={handleHomeButtonClicked}>홈으로</HomeButton>
        </ErrorBox>
      </Page>
    </>
  );
};

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const HomeButton = styled.button`
  margin-top: 20px;
  border-radius: 5px;
  width: 20%;
  height: 40px;
  background: #333333;
  color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 10px -3px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
  }
`;

export default NotFound;
