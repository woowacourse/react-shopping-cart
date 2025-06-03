import { useEffect } from "react";
import { useError } from "@/context";
import { Text } from "@/components";
import * as S from "./ErrorPopup.styles";

export default function ErrorPopup() {
  const { error, hideError, showError } = useError();

  useEffect(() => {
    if (error?.type === "network") return;

    const timer = setTimeout(() => {
      hideError();
    }, 3000);
    return () => clearTimeout(timer);
  }, [error, hideError]);

  useEffect(() => {
    const networkError = () => showError({ type: "network", message: "네트워크 연결이 끊겼습니다." });
    window.addEventListener("offline", networkError);
    return () => window.removeEventListener("offline", networkError);
  }, [showError]);

  useEffect(() => {
    const networkNormal = () => hideError();
    window.addEventListener("online", networkNormal);
    return () => window.removeEventListener("online", networkNormal);
  }, [hideError]);

  if (!error) return null;
  return (
    <S.ErrorPopupWrapper role="alert" aria-live="assertive">
      <Text>{error.message}</Text>
    </S.ErrorPopupWrapper>
  );
}
