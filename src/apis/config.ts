const getBaseUrl = () => {
  if (import.meta.env.VITE_USE_MOCK === "true") {
    return import.meta.env.VITE_MOCK_BASE_URL;
  }
  return import.meta.env.VITE_API_BASE_URL;
};

export const API_BASE_URL = getBaseUrl();
export const CLIENT_BASE_PATH =
  import.meta.env.BASE_URL || "/react-shopping-cart";
