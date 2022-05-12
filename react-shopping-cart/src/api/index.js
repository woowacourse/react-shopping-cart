export const fetchProducts = async (id) => {
  const res = await fetch(
    `https://jungmin-shopping-cart-server.herokuapp.com/products?_page=${id}&_limit=12`
  );
  if (!res.ok) {
    throw new Error("로드에 실패했습니다");
  }
  return await res.json();
};

export const fetchDetailProduct = async (id) => {
  const res = await fetch(
    `https://jungmin-shopping-cart-server.herokuapp.com/products/${id}`
  );
  if (!res.ok) {
    throw new Error("로드에 실패했습니다!");
  }
  return await res.json();
};

export const fetchCarts = async () => {
  const res = await fetch(
    "https://jungmin-shopping-cart-server.herokuapp.com/carts"
  );
  if (!res.ok) {
    throw new Error("로드에 실패했습니다");
  }
  return await res.json();
};

export const addProductToCart = async (product) => {
  const res = await fetch(
    "https://jungmin-shopping-cart-server.herokuapp.com/carts",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );
  if (!res.ok) {
    throw new Error("등록에 실패했습니다");
  }
  return await res.json();
};

export const deleteProductFromCart = async (id) => {
  const res = await fetch(
    `https://jungmin-shopping-cart-server.herokuapp.com/carts/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("삭제에 실패했습니다");
  }
  return await res.json();
};
