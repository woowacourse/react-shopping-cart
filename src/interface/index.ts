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

interface CartItem {
  id: string;
  quantity: number;
  isSelected: boolean;
}

interface Cart {
  cart: CartItem[];
}

interface RequestError {
  requestErrorMessage: string | null;
}

export { Product, ProductsObject, CartItem, Cart, RequestError };
