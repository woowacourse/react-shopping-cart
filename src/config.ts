const BASE_URL = import.meta.env.VITE_API_URL as string;
const USERNAME = import.meta.env.VITE_USERNAME as string;
const USER_PASSWORD = import.meta.env.VITE_PASSWORD as string;

if (!BASE_URL || !USERNAME || !USER_PASSWORD) {
  throw new Error(
    "API_URL, USERNAME, PASSWORD environment variables are not set"
  );
}

export { BASE_URL, USERNAME, USER_PASSWORD };
