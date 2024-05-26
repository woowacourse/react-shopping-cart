const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;

function generateBasicToken() {
  const token = btoa(`${USERNAME}:${PASSWORD}`);
  return `Basic ${token}`;
}

export const HEADERS = {
  Authorization: generateBasicToken(),
  'Content-Type': 'application/json',
};

export const BASE_URL = import.meta.env.VITE_BASE_URL;
