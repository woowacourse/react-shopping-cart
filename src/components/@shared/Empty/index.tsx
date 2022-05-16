import emptyPage from "../../../assets/emptyPage.jpeg";
import FlexBox from "../../../styles/FlexBox";
import * as Styled from "./styles";

function Empty() {
  return (
    <FlexBox flexDirection="column" justifyContent="center" alignItems="center">
      <Styled.EmptyImage alt="emptyPage" src={emptyPage} />
    </FlexBox>
  );
}

export default Empty;
