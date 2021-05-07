interface Product {
  name: string;
  price: number;
  imageSrc: string;
}

interface ProductsObject {
  products: {
    [key: string]: Product;
  };
}

interface RequestError {
  requestErrorMessage: string | null;
}

export { Product, ProductsObject, RequestError };
