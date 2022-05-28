export const setCartList = async (cartList) => {
  try {
    const response = await postCartList(cartList);
    if (!response.ok) {
      throw new Error(response);
    }
  } catch (e) {
    alert(e);
  }
};

const postCartList = async (cartList) => {
  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cartList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cartList),
  });
  return response;
};

export const updateProductList = async (cartList) => {};
