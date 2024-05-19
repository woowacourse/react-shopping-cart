/**
 * generateBasicToken - Basic auth를 위한 토큰을 만드는 함수입니다.
 * @param {string} userId - USERNAME입니다.
 * @param {string} userPassword - PASSWORD입니다.
 * @returns {string}
 */
export function generateBasicToken(userId: string, userPassword: string): string {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}
