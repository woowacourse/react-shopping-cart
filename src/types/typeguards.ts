import {
  ProductId,
  Quantity,
  Product,
  ProductWithId,
  ProductsWithId,
  CartProduct,
  CartProducts,
} from "./";

const isObject = (data: unknown): data is object => {
  return typeof data === "object" && data !== null;
};

const isProductId = (data: unknown): data is ProductId => {
  return (
    isObject(data) && "productId" in data && typeof data.productId === "number"
  );
};

const isQuantity = (data: unknown): data is Quantity => {
  return (
    isObject(data) && "quantity" in data && typeof data.quantity === "number"
  );
};

const isProduct = (data: unknown): data is Product => {
  return (
    isObject(data) &&
    "name" in data &&
    "price" in data &&
    "imageUrl" in data &&
    typeof data.name === "string" &&
    typeof data.price === "number" &&
    typeof data.imageUrl === "string"
  );
};

const isProductWithId = (data: unknown): data is ProductWithId => {
  return isProduct(data) && "id" in data && typeof data.id === "number";
};

const isProductsWithId = (data: unknown): data is ProductsWithId => {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every((currentData) => isProduct(currentData));
};

const isCartProduct = (data: unknown): data is CartProduct => {
  return (
    isObject(data) &&
    "id" in data &&
    "quantity" in data &&
    "product" in data &&
    typeof data.id === "number" &&
    typeof data.quantity === "number" &&
    isProduct(data.product)
  );
};

const isCartProducts = (data: unknown): data is CartProducts => {
  if (!Array.isArray(data)) {
    return false;
  }

  return data.every((currentData) => isCartProduct(currentData));
};

export {
  isProductId,
  isQuantity,
  isProduct,
  isProductWithId,
  isProductsWithId,
  isCartProduct,
  isCartProducts,
};
