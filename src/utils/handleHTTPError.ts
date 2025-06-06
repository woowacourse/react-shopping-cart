const handleHttpError = (response: Response) => {
  if (response.status === 400) {
    throw new Error('잘못된 요청입니다. 다시 시도해주세요.');
  }
  if (response.status === 401) {
    throw new Error('로그인 후 이용해주세요. 인증 정보가 확인되지 않았습니다.');
  }
  if (response.status === 403) {
    throw new Error('접근 권한이 없습니다. 관리자에게 문의해주세요.');
  }
  if (response.status === 404) {
    throw new Error('요청하신 페이지를 찾을 수 없습니다. 주소를 확인해주세요.');
  }
  if (response.status === 500) {
    throw new Error('서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

export default handleHttpError;
