import { css } from "@emotion/react";
import { colors, radius, zIndex } from "../../styles/theme";

export const toastCss = css({
  background: colors.errorBg,
  width: "400px",
  padding: "12px 20px",
  margin: "0 auto",
  marginTop: "32px",
  borderRadius: radius.md,
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  position: "fixed",
  top: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: zIndex.toast,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  opacity: 1,
  transition: "all 0.3s ease-in-out",
  animation: "slideInDown 0.3s ease-out",

  "@keyframes slideInDown": {
    from: {
      opacity: 0,
      transform: "translateX(-50%) translateY(-20px)",
    },
    to: {
      opacity: 1,
      transform: "translateX(-50%) translateY(0)",
    },
  },
});

export const fadeOutCss = css({
  opacity: 0,
  transform: "translateX(-50%) translateY(-20px) scale(0.95)",
  transition: "all 0.3s ease-in-out",
});

// 또는 더 부드러운 애니메이션을 원한다면:
export const fadeOutSmoothCss = css({
  opacity: 0,
  transform: "translateX(-50%) translateY(-30px)",
  filter: "blur(1px)",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
});

// 오른쪽으로 슬라이드 아웃하는 버전:
export const slideOutRightCss = css({
  opacity: 0,
  transform: "translateX(100vw)",
  transition: "all 0.5s ease-in-out",
});

export const messageCss = css({
  margin: 0,
  fontSize: "16px",
  fontWeight: "500",
  color: colors.error,
});

export const closeButtonCss = css({
  background: "none",
  border: "none",
  color: colors.error,
  cursor: "pointer",
  fontSize: "18px",
  padding: "0 0 0 10px",
  transition: "opacity 0.2s ease",

  "&:hover": {
    opacity: 0.7,
  },
});
