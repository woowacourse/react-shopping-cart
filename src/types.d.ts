type Product = {
  category: "fashion";
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

type CartItemInfo = {
  id: number;
  product: Product;
  quantity: number;
};

type CartItemCheckedStateInStorage = {
  [key: number]: boolean;
};

interface Coupon {
  id: number;
  code: string;
  description: string;
  discountType: "fixed" | "percentage" | "buyXgetY" | "freeShipping";
  discount?: number;
  minimumAmount?: number;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string; // hh:mm:ss
    end: string; // hh:mm:ss
  };
  expirationDate: string; // YYYY-MM-DD
}
