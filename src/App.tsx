import { css } from "@emotion/css";
import Header from "./components/@common/Header/Header";

function App() {
  return (
    <div className={AppStyles}>
      <Header />
    </div>
  );
}

export default App;

const AppStyles = css`
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
`;
