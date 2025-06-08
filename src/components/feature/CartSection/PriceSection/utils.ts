import { CartProduct } from "../../../../type/cart";

export const getPrice = ({
  items,
  isRemoteArea,
  discount,
}: {
  items: CartProduct[] | undefined;
  isRemoteArea: boolean | undefined;
  discount: number | undefined;
}) => {
  const getOrderPrice = () => {
    return (
      items?.reduce(
        (total: number, current: CartProduct) =>
          current.product.price * current.quantity + total,
        0
      ) ?? 0
    );
  };

  const orderPrice = getOrderPrice();
  const deliveryPrice = getDeliveryPrice({ orderPrice, isRemoteArea });
  const totalPrice = getTotalPrice({ orderPrice, deliveryPrice, discount });
  const totalAmount = items?.reduce(
    (total: number, current: CartProduct) => total + current.quantity,
    0
  );

  return { orderPrice, deliveryPrice, totalPrice, totalAmount };
};

export const getDeliveryPrice = ({
  orderPrice,
  isRemoteArea,
}: {
  orderPrice: number;
  isRemoteArea: boolean | undefined;
}) => {
  const remoteAreaDeliveryPrice = isRemoteArea ? 3000 : 0;
  if (orderPrice >= 100_000) return remoteAreaDeliveryPrice;
  return 3000 + remoteAreaDeliveryPrice;
};

const getTotalPrice = ({
  orderPrice,
  deliveryPrice,
  discount,
}: {
  orderPrice: number;
  deliveryPrice: number;
  discount: number | undefined;
}) => {
  if (discount) return orderPrice + deliveryPrice - discount;
  return orderPrice + deliveryPrice;
};
