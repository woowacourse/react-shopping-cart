const deleteCartItems = async (id: number) => {
  const response = await fetch(
    `http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to update cart item');
  }

  return response.json();
};

export default deleteCartItems;
