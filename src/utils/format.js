/* eslint-disable camelcase */
const createFormat = () => {
  const formatProduct = ({ product_id, price, name, image_url }) => ({
    productId: Number(product_id),
    price: Number(price),
    name: String(name),
    imageURL: String(image_url),
  });

  const formatCart = ({ cart_id, ...rest }) => ({
    ...formatProduct(rest),
    cartId: Number(cart_id),
    checked: true,
    quantity: 1,
  });

  const formatOrder = ({ order_id, order_details }) => ({
    orderId: Number(order_id),
    orderDetails: order_details.map(({ quantity, ...rest }) => ({
      ...formatProduct(rest),
      quantity: Number(quantity),
    })),
  });

  return {
    product: formatProduct,
    cart: formatCart,
    order: formatOrder,
  };
};

const format = createFormat();

export default format;
