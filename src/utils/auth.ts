function generateBasicToken(userId: string, userPassword: string): string {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
}
// 서버 통신 인증에 필요한 ID와 PASSWORD를 이용해 Basic 인증 조건에 맞게 토큰 생성

export default generateBasicToken;
