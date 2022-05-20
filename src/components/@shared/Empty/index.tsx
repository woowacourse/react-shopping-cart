import emptyPage from "../../../assets/emptyPage.jpeg";
import { EmptyImageWrapper } from "./styles";

function Empty() {
  return (
    <EmptyImageWrapper>
      <img alt="emptyPage" src={emptyPage} />
    </EmptyImageWrapper>
  );
}

export default Empty;
