export function getBrowserBaseUrl(): string {
  // Vite 환경에서만 동작하도록 보호
  if (typeof window === "undefined") return "/"; // 테스트 환경 대응

  return typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.BASE_URL
    ? import.meta.env.BASE_URL
    : "/";
}
