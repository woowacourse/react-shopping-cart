export const API_TOKEN = `Basic ${btoa(
  `${import.meta.env.VITE_API_USER_ID}:${import.meta.env.VITE_API_USER_PASSWORD}`
)}`;
