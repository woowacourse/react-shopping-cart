export const fetchAddCart = async (id: number) => {
  const response = await fetch("/cart-items", {
    method: "POST",
    body: JSON.stringify({
      productId: id,
    }),
  });
  const result = await response.json();
  console.log(result);
};

export const fetchDeleteCart = async (id: number) => {
  const response = await fetch(`/cart-items/${id}`, {
    method: "DELETE",
  });
  console.log(response);
};

export const fetchUpdateCart = async (id: number, quantity: number) => {
  const response = await fetch(`/cart-items/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      quantity,
    }),
  });
  const result = await response.json();
  console.log(result);
};
