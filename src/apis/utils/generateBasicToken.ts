/**
 * HTTP 기본 인증(Basic Authentication)을 위한 토큰 생성 함수
 *
 * 사용자 ID와 비밀번호를 인코딩하여 'Basic' 스키마에 따른 인증 토큰을 생성한다.
 * 생성된 토큰은 HTTP 요청의 Authorization 헤더에 사용될 수 있다.
 *
 * @param userId 사용자 ID
 * @param userPassword 사용자 비밀번호
 * @returns 인코딩된 기본 인증 토큰
 *
 */
export function generateBasicToken(
  userId: string,
  userPassword: string
): string {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}
