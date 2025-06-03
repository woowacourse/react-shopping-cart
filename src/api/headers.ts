export const headers = {
  Authorization: `Basic ${btoa(`${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`)}`,
  'Content-Type': 'application/json'
};
