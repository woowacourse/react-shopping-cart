import { CartInformation, ProductInformation } from '@type/types';

interface UpdateCart {
  cart: CartInformation[];
  id: number;
  quantity: number;
}

export const changedQuantityCart = ({ cart, id, quantity }: UpdateCart) => {
  return cart.map((product) => {
    if (product.id === id) {
      return { ...product, quantity };
    }
    return product;
  });
};

export const createServerCartItem = ({
  id,
  name,
  price,
  imageUrl,
}: ProductInformation) => {
  const product: CartInformation = {
    id,
    product: { name, price, imageUrl, id },
    quantity: 1,
  };

  return product;
};

export const createCartItem = ({
  id,
  name,
  price,
  imageUrl,
}: ProductInformation) => {
  const product: CartInformation = {
    id,
    product: { name, price, imageUrl, id },
    quantity: 1,
    isSelect: true,
  };

  return product;
};

export const removedItemCart = (cart: CartInformation[], id: number) => {
  return cart.filter((product) => id !== product.id);
};

export const toggleSelectCartItem = (cart: CartInformation[], id: number) => {
  return cart.map((cartItem) => {
    if (cartItem.id === id) {
      return { ...cartItem, isSelect: !cartItem.isSelect };
    }

    return cartItem;
  });
};

export const removeSelectedCartItem = (cart: CartInformation[]) => {
  return cart.filter((cartItem) => cartItem.isSelect === false);
};
