interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface RawCartItem {
  id: number;
  quantity: number;
  product: Product;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

type DiscountType = 'fixed' | 'buyXgetY' | 'freeShipping' | 'percentage';
interface AvailableTime {
  start: string;
  end: string;
}

interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
  discountType: DiscountType;
}

interface TEST_ITEM_PROP<T> {
  input: T;
  expected: T;
}
