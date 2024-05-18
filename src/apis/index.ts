const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

/**
 * @description : api의 authoriation 에 사용될 인증 정보입니다.
 * @example
  const response = await fetch(`${API_URL}/cart-items`, {
    method: "GET",
    headers: { Authorization: basicToken },
  });
 */

export const basicToken = `Basic ${btoa(`${USER_ID}:${USER_PASSWORD}`)}`;
