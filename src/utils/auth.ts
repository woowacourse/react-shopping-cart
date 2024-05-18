/**
 * api를 사용할 때 headers의 authoration 에 사용될 인증 정보입니다.
 * @param userId api에 사용될 id 입니다.
 * @param userPassword api에 사용될 password 입니다.
 * 
 * 
 * 사용 예시
 const response = await fetch(`${API_URL}/cart-items`, {
    method: "GET",
    headers: { Authorization: generateBasicToken },
  });
 */

export const generateBasicToken = ({
  userId,
  userPassword,
}: {
  userId: string;
  userPassword: string;
}) => {
  const token = btoa(`${userId}:${userPassword}`);
  return `Basic ${token}`;
};
