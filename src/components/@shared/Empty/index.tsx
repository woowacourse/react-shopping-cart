import emptyPage from "../../../assets/emptyPage.jpeg";
import * as Styled from "./styles";

function Empty() {
  return (
    <Styled.EmptyImageWrapper>
      <img alt="emptyPage" src={emptyPage} />
    </Styled.EmptyImageWrapper>
  );
}

export default Empty;
