import { useErrorContext } from "../../../contexts/ErrorContext";

import { Container, StyledSpan } from "./ErrorBox.styles";

export default function ErrorBox() {
  const { errorMessage } = useErrorContext();
  console.log(errorMessage);

  if (!errorMessage) {
    return null;
  }

  return (
    <Container>
      <span>{errorMessage}</span>
    </Container>
  );
}
