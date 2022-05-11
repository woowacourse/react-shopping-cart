export const fetchProducts = async () => {
  const res = await fetch("http://localhost:3002/products");
  if (!res.ok) {
    throw new Error("로드에 실패했습니다");
  }
  return await res.json();
};

export const fetchCarts = async () => {
  const res = await fetch("http://localhost:3002/carts");
  if (!res.ok) {
    throw new Error("로드에 실패했습니다");
  }
  return await res.json();
};

export const addProductToCart = async (product) => {
  const res = await fetch("http://localhost:3002/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error("등록에 실패했습니다");
  }
  return await res.json();
};

export const deleteProductFromCart = async (id) => {
  const res = await fetch(`http://localhost:3002/carts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("삭제에 실패했습니다");
  }
  return await res.json();
};
