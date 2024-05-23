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
  start: Date;
  end: Date;
}

interface Coupon {
  id: number;
  code: string;
  description: string;
  expirationDate: Date;
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: AvailableTime;
  discountType: DiscountType;
}
