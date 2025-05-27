const getCartItems = async () => {
  const data = await fetch(
    'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items'
  );
  const { content } = await data.json();

  return content;
};

export default getCartItems;
