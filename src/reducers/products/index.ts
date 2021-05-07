interface Product {
  name: string;
  price: number;
}

interface ProductsObject {
  [key: string]: Product;
}

const initialState: ProductsObject = {};

const productsReducer = (state = initialState, action) => {};

export default productsReducer;
export { Product, ProductsObject };
