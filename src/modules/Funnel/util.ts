export const getCurrentStep = (initialStep: number) =>
  Number(new URLSearchParams(window.location.search).get("step") ?? initialStep);
