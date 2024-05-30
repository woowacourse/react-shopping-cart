jest.mock("./src/apis/url", () => {
  return {
    cartItems: "mock",
    orders: "mock",
    product: "mock",
    coupons: "mock",
    cartItemsWithId: "mock",
  };
});

jest.mock("./src/auth/index", () => {
  return {
    USER_ID: "mock",
    USER_PASSWORD: "mock",
  };
});
