import { useEffect } from "react";
import { useErrorMessage } from "../../../../contexts/ErrorContext";
import Text from "../../Text";
import * as S from "./Popup.styled";

const ErrorPopup = () => {
  const { errorMessage, clearErrorMessage } = useErrorMessage();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearErrorMessage();
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage, clearErrorMessage]);

  if (errorMessage)
    return (
      <S.Container>
        <Text variant="body-2">{errorMessage}</Text>
      </S.Container>
    );
};

export default ErrorPopup;
