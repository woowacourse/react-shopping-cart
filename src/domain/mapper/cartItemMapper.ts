export type RawCartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
};

export type CartItemType = {
  cartItemId: number;
  productId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
};

export const mapToCartItem = (raw: RawCartItem): CartItemType => ({
  cartItemId: raw.id,
  productId: raw.product.id,
  name: raw.product.name,
  quantity: raw.quantity,
  price: raw.product.price,
  imageUrl: raw.product.imageUrl
});
