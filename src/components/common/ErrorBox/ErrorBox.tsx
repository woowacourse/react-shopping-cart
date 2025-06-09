import { useErrorContext } from "../../../contexts/ErrorContext";

import { Container, StyledSpan } from "./ErrorBox.styles";

export default function ErrorBox() {
  const { errorMessage } = useErrorContext();

  if (!errorMessage) {
    return null;
  }

  return (
    <Container>
      <span>{errorMessage}</span>
    </Container>
  );
}
