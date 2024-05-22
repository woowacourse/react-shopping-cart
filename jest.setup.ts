jest.mock('./src/api/index', () => {
  return {
    BASE_URL: 'http://url.com',
    USER_ID: 'userId',
    USER_PASSWORD: 'userPassword',
  };
});
