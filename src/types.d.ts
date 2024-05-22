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

type Coupon = {
  id: number;
  code: string;
  description: string;
  expirationDate: string;
  discount?: number;
  minimumAmount?: number;
  discountType: string;
  buyQuantity?: number;
  getQuantity?: number;
  availableTime?: {
    start: string;
    end: string;
  };
};
