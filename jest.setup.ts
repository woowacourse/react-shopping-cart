jest.mock("./src/config/serverUrl", () => {
  return {
    userId: "userId",
    userPassword: "pwd",
    apiUrl: "http://url.com",
  };
});
