/**
 * 사용자의 아이디와 비밀번호를 받아 Base64 방식으로 인코딩 하는 함수
 * (현재 프로젝트에서 Basic 인증 방식 적용)
 * @param userId {string} - 유저 아이디
 * @param userPassword {string} - 유저 비밀번호
 * @returns {string} Base64 방식으로 인코딩 된 값
 */
export function generateBasicToken(
  userId: string,
  userPassword: string,
): string {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}
