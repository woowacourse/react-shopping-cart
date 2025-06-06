export const colors = {
  // 기본 색상
  black: "#000",
  white: "#fff",

  // 회색 계열 (실제 많이 사용되는 것들만)
  gray: {
    50: "#f0f0f0", // hover 배경
    100: "#EAEAEA", // 버튼 배경
    200: "#E0E0E0", // 가장 많이 사용되는 border, hover
    300: "#ccc", // border
    400: "#aaa", // placeholder
    500: "#555", // 중간 텍스트
    600: "#333", // 어두운 텍스트
    900: "#111", // 가장 어두운 회색
  },

  // 브랜드 색상
  primary: "#0070f3",
  blue: "#3498db",

  // 상태 색상
  success: "#4CAF50",
  error: "#D63031",
  errorBg: "#FFC9C9",
  warning: "#F44336",

  // 오버레이
  overlay: "rgba(0, 0, 0, 0.3)",
  overlayLight: "rgba(0, 0, 0, 0.1)",
};

export const radius = {
  xs: "4px",
  sm: "5px",
  md: "8px",
  circle: "50%",
};

export const theme = {
  colors,
  radius,
} as const;

export const zIndex = {
  toast: 100000,
  modal: 10000,
} as const;
