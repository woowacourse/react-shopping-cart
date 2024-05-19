jest.mock('./src/api/index', () => {
  return {
    userId: 'userId',
    userPassword: 'pwd',
    apiUrl: 'http://url.com',
  };
});
