interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface Cart {
  id: number;
  quantity: number;
  product: Product;
}

interface Price {
  totalOrderPrice: number;
  deliveryFee: number;
  totalPrice: number;
}

interface PriceList {
  [key: number]: [string, number];
}

interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discountType: 'fixed' | 'percentage' | 'buyXgetY' | 'freeShipping';
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: { end: string; start: string };
}
