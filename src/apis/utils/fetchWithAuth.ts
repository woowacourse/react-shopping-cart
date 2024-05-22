import { generateBasicToken } from "./generateBasicToken";

const API_URL = import.meta.env.VITE_API_URL;
const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

const fetchWithAuth = async (endpoint: string, options: RequestInit) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error, status: ${response.status}, message: ${errorText}`
    );
  }

  return response;
};

export default fetchWithAuth;
