import emptyPage from "../../../assets/emptyPage.jpeg";
import * as Styled from "./styles";

function NotFound() {
  return (
    <Styled.Content>
      <Styled.EmptyPageImage alt="emptyPage" src={emptyPage} />
    </Styled.Content>
  );
}

export default NotFound;
