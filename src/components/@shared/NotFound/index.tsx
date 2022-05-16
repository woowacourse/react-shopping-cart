import emptyPage from "../../../assets/emptyPage.jpeg";
import FlexBox from "../../../styles/FlexBox";
import * as Styled from "./styles";

function NotFound() {
  return (
    <FlexBox flexDirection="column" justifyContent="center" alignItems="center">
      <Styled.EmptyPageImage alt="emptyPage" src={emptyPage} />
    </FlexBox>
  );
}

export default NotFound;
