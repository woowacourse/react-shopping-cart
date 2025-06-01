import { useErrorContext } from "../../../contexts/ErrorContext";

import { StyledDiv, StyledSpan } from "./ErrorBox.styles";

export default function ErrorBox() {
  const { errorMessage } = useErrorContext();
  console.log(errorMessage);

  if (!errorMessage) {
    return null;
  }

  return (
    <StyledDiv>
      <StyledSpan>{errorMessage}</StyledSpan>
    </StyledDiv>
  );
}
